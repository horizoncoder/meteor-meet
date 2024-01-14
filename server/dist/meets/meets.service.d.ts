import { Model } from 'mongoose';
import { Meets } from './meets.model';
import { CreateMeetDto } from './meet.dto';
import { OrganizationService } from "../organizations/organization.service";
import { UsersService } from "../users/users.service";
export declare class MeetsService {
    private readonly meetsModel;
    private readonly organizationService;
    private readonly userService;
    constructor(meetsModel: Model<Meets>, organizationService: OrganizationService, userService: UsersService);
    createMeet(userId: string, createMeetDto: CreateMeetDto): Promise<Meets>;
    getAllMeets(page?: number, limit?: number): Promise<[Meets[], number, number]>;
    getAllMeetsInOrganization(page: number, limit: number, organizationId: string): Promise<[any[], number, number]>;
}
