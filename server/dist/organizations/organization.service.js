"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let OrganizationService = class OrganizationService {
    constructor(organizationModel) {
        this.organizationModel = organizationModel;
    }
    async createOrganization(name, adminCode, userCode) {
        const newOrganization = new this.organizationModel({
            name,
            adminCode,
            userCode
        });
        await newOrganization.save();
        return newOrganization;
    }
    async getAllOrganization(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const organizations = await this.organizationModel.find().skip(skip).limit(limit).exec();
        const total = await this.organizationModel.countDocuments();
        return [organizations, total];
    }
    async updateOrganization(organizationId, updatedData) {
        try {
            console.log(organizationId);
            const result = await this.organizationModel.updateOne({ _id: organizationId }, { $set: updatedData });
            if (result) {
                return await this.organizationModel.findById(organizationId).exec();
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async deleteOrganization(organizationId) {
        return await this.organizationModel.findByIdAndDelete(organizationId).exec();
    }
    async addUserToOrganization(addUserDto, userId) {
        const { type, code } = addUserDto;
        let query;
        if (type === 'owner') {
            query = { adminCode: code };
        }
        else if (type === 'user') {
            query = { userCode: code };
        }
        else {
            throw new common_1.NotFoundException('Invalid organization type');
        }
        const organization = await this.organizationModel.findOne(query).exec();
        if (!organization) {
            throw new common_1.NotFoundException('Organization not found with the provided code');
        }
        if (type === 'owner') {
            if (organization.organizationOwners.includes(userId)) {
                throw new common_1.NotFoundException('User is already an owner of the organization');
            }
            organization.organizationOwners.push(userId);
            await organization.save();
        }
        if (type === 'user') {
            if (organization.organizationUser.includes(userId)) {
                throw new common_1.NotFoundException('User is already an owner of the organization');
            }
            organization.organizationUser.push(userId);
            await organization.save();
        }
        return organization;
    }
    async getOrganizationsByRole(page = 1, limit = 10, userId, role) {
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
            return Object.assign(Object.assign({}, org.toObject()), { userRole });
        });
        return [organizationsWithRole, total];
    }
    async isUserOrganizationOwner(organizationId, userId) {
        const organization = await this.organizationModel.findOne({ _id: organizationId, organizationOwners: userId }).exec();
        return !!organization;
    }
};
exports.OrganizationService = OrganizationService;
exports.OrganizationService = OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('organization')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrganizationService);
//# sourceMappingURL=organization.service.js.map