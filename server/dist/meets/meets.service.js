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
exports.MeetsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const organization_service_1 = require("../organizations/organization.service");
const users_service_1 = require("../users/users.service");
let MeetsService = class MeetsService {
    constructor(meetsModel, organizationService, userService) {
        this.meetsModel = meetsModel;
        this.organizationService = organizationService;
        this.userService = userService;
    }
    async createMeet(userId, createMeetDto) {
        const { organizationId, name } = createMeetDto;
        const isOwner = await this.organizationService.isUserOrganizationOwner(userId, organizationId);
        if (isOwner) {
            throw new common_1.ForbiddenException('You do not have permission to create a meet for this organization.');
        }
        const newMeet = new this.meetsModel(Object.assign(Object.assign({}, createMeetDto), { ownerId: userId, joinedUsers: [] }));
        await newMeet.save();
        return newMeet;
    }
    async getAllMeets(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const meets = await this.meetsModel.find().skip(skip).limit(limit).exec();
        const total = await this.meetsModel.countDocuments();
        const totalPages = Math.ceil(total / limit);
        return [meets, total, totalPages];
    }
    async getAllMeetsInOrganization(page = 1, limit = 10, organizationId) {
        const skip = (page - 1) * limit;
        const meets = await this.meetsModel
            .find({ organizationId })
            .skip(skip)
            .limit(limit)
            .exec();
        const total = await this.meetsModel.countDocuments({ organizationId });
        const totalPages = Math.ceil(total / limit);
        const meetsWithOwnerName = await Promise.all(meets.map(async (meet) => {
            const role = await this.organizationService.isUserOrganizationOwner(organizationId, meet.ownerId);
            const owner = await this.userService.findUserById(meet.ownerId);
            return {
                id: meet._id,
                name: meet.name,
                createdAt: meet.createdAt,
                ownerName: owner.name,
                role: role ? 'owner' : 'user'
            };
        }));
        return [meetsWithOwnerName, total, totalPages];
    }
};
exports.MeetsService = MeetsService;
exports.MeetsService = MeetsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Meets')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        organization_service_1.OrganizationService,
        users_service_1.UsersService])
], MeetsService);
//# sourceMappingURL=meets.service.js.map