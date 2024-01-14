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
exports.OrganizationsController = void 0;
const common_1 = require("@nestjs/common");
const organization_service_1 = require("./organization.service");
const jwt_auth_guard_1 = require("../guard/jwt-auth.guard");
const update_organization_dto_1 = require("../dto/update-organization.dto");
const oraganization_dto_1 = require("./oraganization.dto");
let OrganizationsController = class OrganizationsController {
    constructor(organizationService) {
        this.organizationService = organizationService;
    }
    async addUser(name, adminCode, userCode) {
        const result = await this.organizationService.createOrganization(name, adminCode, userCode);
        return {
            msg: 'Organization successfully registered',
            result
        };
    }
    async getAllOrganization(page = 1, limit = 10) {
        const [organizations, total] = await this.organizationService.getAllOrganization(page, limit);
        const totalPages = Math.ceil(total / limit);
        return {
            data: organizations,
            pagination: {
                total,
                totalPages,
                currentPage: page,
            }
        };
    }
    async updateOrganization(organizationId, updateOrganizationDto) {
        const updatedOrganization = await this.organizationService.updateOrganization(organizationId, updateOrganizationDto);
        if (!updatedOrganization) {
            throw new common_1.NotFoundException('Organization not found');
        }
        return updatedOrganization;
    }
    async deleteOrganization(organizationId) {
        const deletedOrganization = await this.organizationService.deleteOrganization(organizationId);
        if (!deletedOrganization) {
            throw new common_1.NotFoundException('Organization not found');
        }
        return { message: 'Organization deleted successfully' };
    }
    async addUserToOrganization(req, addUserDto) {
        const userId = req.user.id;
        const organization = await this.organizationService.addUserToOrganization(addUserDto, userId);
        if (!organization) {
            throw new common_1.NotFoundException('Organization not found');
        }
        return organization;
    }
    async getOrganizationsByRole(page = 1, limit = 10, role = 'user', req) {
        const userId = req.user.id;
        const [organizationsWithRole, total] = await this.organizationService.getOrganizationsByRole(page, limit, userId, role);
        const totalPages = Math.ceil(total / limit);
        return {
            data: organizationsWithRole,
            pagination: {
                total,
                totalPages,
                currentPage: page,
            }
        };
    }
};
exports.OrganizationsController = OrganizationsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, common_1.Body)('name')),
    __param(2, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "addUser", null);
__decorate([
    (0, common_1.Get)('/all'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "getAllOrganization", null);
__decorate([
    (0, common_1.Put)('/update'),
    __param(0, (0, common_1.Query)('organizationId')),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_organization_dto_1.UpdateOrganizationDto]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "updateOrganization", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "deleteOrganization", null);
__decorate([
    (0, common_1.Post)('addUser'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, oraganization_dto_1.AddUserDto]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "addUserToOrganization", null);
__decorate([
    (0, common_1.Get)('byRole'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('role')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "getOrganizationsByRole", null);
exports.OrganizationsController = OrganizationsController = __decorate([
    (0, common_1.Controller)('organizations'),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService])
], OrganizationsController);
//# sourceMappingURL=organizations.controller.js.map