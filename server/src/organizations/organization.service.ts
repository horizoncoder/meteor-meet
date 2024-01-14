import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {FilterQuery, Model} from 'mongoose';
import {Organization} from "./organizations.model";
import {AddUserDto} from "./oraganization.dto";

@Injectable()
export class OrganizationService {
  constructor(@InjectModel('organization') private readonly organizationModel: Model<Organization>) {
  }

  async createOrganization(name: string, adminCode: string, userCode: string) {
    const newOrganization = new this.organizationModel({
      name,
      adminCode,
      userCode
    });
    await newOrganization.save();
    return newOrganization;
  }

  async getAllOrganization(page: number = 1, limit: number = 10): Promise<[Organization[], number]> {
    const skip = (page - 1) * limit;
    const organizations = await this.organizationModel.find().skip(skip).limit(limit).exec();
    const total = await this.organizationModel.countDocuments();

    return [organizations, total];
  }

  async updateOrganization(organizationId: string, updatedData: Partial<Organization>): Promise<Organization | null> {
    try {
      console.log(organizationId)
      const result = await this.organizationModel.updateOne({_id: organizationId}, {$set: updatedData});

      if (result) {
        return await this.organizationModel.findById(organizationId).exec();
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteOrganization(organizationId: string): Promise<Organization | null> {
    return await this.organizationModel.findByIdAndDelete(organizationId).exec();
  }

  async addUserToOrganization(addUserDto: AddUserDto, userId:string): Promise<Organization | null> {
    const {type, code} = addUserDto;

    let query: FilterQuery<Organization>;

    if (type === 'owner') {
      query = { adminCode: code };
    } else if (type === 'user') {
      query = { userCode: code };
    } else {
      throw new NotFoundException('Invalid organization type');
    }

    const organization = await this.organizationModel.findOne(query).exec();

    if (!organization) {
      throw new NotFoundException('Organization not found with the provided code');
    }
  if(type==='owner'){
    if (organization.organizationOwners.includes(userId)) {
      throw new NotFoundException('User is already an owner of the organization');
    }
    organization.organizationOwners.push(userId);
    await organization.save();
  }

    if(type==='user'){
      if (organization.organizationUser.includes(userId)) {
        throw new NotFoundException('User is already an owner of the organization');
      }
      organization.organizationUser.push(userId);
      await organization.save();
    }


    return organization;
  }
  async getOrganizationsByRole(page: number = 1, limit: number = 10, userId: string, role: 'user' | 'owner'): Promise<any> {
    const skip = (page - 1) * limit;
    const query = role === 'user' ? { organizationUser: { $in: [userId] } } : { organizationOwners: { $in: [userId] } };
    const organizations = await this.organizationModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .select('_id name createdAt')
        .exec();
    const total = await this.organizationModel.countDocuments(query);

    const organizationsWithRole = organizations.map(org => {
      const userRole = role === 'user' ? 'user' : 'owner';
      return { ...org.toObject(), userRole };
    });

    return [organizationsWithRole, total];
  }
async isUserOrganizationOwner(organizationId:any, userId: any){
   const organization = await this.organizationModel.findOne({ _id: organizationId, organizationOwners: userId }).exec();
  return !!organization;
}
}
