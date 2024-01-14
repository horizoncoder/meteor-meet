"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const meets_controller_1 = require("./meets.controller");
const meets_service_1 = require("./meets.service");
const meets_model_1 = require("./meets.model");
const organization_service_1 = require("../organizations/organization.service");
const organizations_model_1 = require("../organizations/organizations.model");
const users_service_1 = require("../users/users.service");
const users_model_1 = require("../users/users.model");
const jwt_1 = require("@nestjs/jwt");
let MeetsModule = class MeetsModule {
};
exports.MeetsModule = MeetsModule;
exports.MeetsModule = MeetsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Meets', schema: meets_model_1.MeetsSchema }, { name: 'organization', schema: organizations_model_1.OrganizationSchema }, { name: 'user', schema: users_model_1.UserSchema }]),
        ],
        controllers: [meets_controller_1.MeetsController],
        providers: [meets_service_1.MeetsService, organization_service_1.OrganizationService, users_service_1.UsersService, jwt_1.JwtService],
    })
], MeetsModule);
//# sourceMappingURL=meets.module.js.map