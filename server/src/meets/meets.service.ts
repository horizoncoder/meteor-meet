// meets.service.ts

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meets } from './meets.model';
import { CreateMeetDto } from './meet.dto';
import {OrganizationService} from "../organizations/organization.service";
import {UsersService} from "../users/users.service";

@Injectable()
export class MeetsService {
  constructor(
      @InjectModel('Meets') private readonly meetsModel: Model<Meets>,
      private readonly organizationService: OrganizationService,
      private readonly userService: UsersService,
  ) {}

  async createMeet(userId: string, createMeetDto: CreateMeetDto): Promise<Meets> {
    const { organizationId, name } = createMeetDto;
    const isOwner = await this.organizationService.isUserOrganizationOwner(userId, organizationId);
    if (isOwner) {
      throw new ForbiddenException('You do not have permission to create a meet for this organization.');
    }

    const newMeet = new this.meetsModel({
      ...createMeetDto,
      ownerId: userId,
      joinedUsers: [],
    });

    await newMeet.save();
    return newMeet;
  }
  async getAllMeets(page: number = 1, limit: number = 10): Promise<[Meets[], number, number]> {
    const skip = (page - 1) * limit;
    const meets = await this.meetsModel.find().skip(skip).limit(limit).exec();
    const total = await this.meetsModel.countDocuments();
    const totalPages = Math.ceil(total / limit);
    return [meets, total, totalPages];
  }

  async getAllMeetsInOrganization(
      page: number = 1,
      limit: number = 10,
      organizationId: string,
  ): Promise<[any[], number, number]> {
    const skip = (page - 1) * limit;
    const meets = await this.meetsModel
        .find({ organizationId })
        .skip(skip)
        .limit(limit)
        .exec();
    const total = await this.meetsModel.countDocuments({ organizationId });
    const totalPages = Math.ceil(total / limit);

    const meetsWithOwnerName = await Promise.all(
        meets.map(async (meet: any) => {
          const role= await this.organizationService.isUserOrganizationOwner(organizationId, meet.ownerId )
          const owner: any = await this.userService.findUserById(meet.ownerId);
          return {
            id: meet._id,
            name: meet.name,
            createdAt: meet.createdAt,
            ownerName: owner.name,
            role: role ? 'owner': 'user'
          };
        }),
    );

    return [meetsWithOwnerName, total, totalPages];
  }

}
