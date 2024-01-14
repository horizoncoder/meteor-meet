/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { OrganizationService } from './organization.service';
import { UpdateOrganizationDto } from "../dto/update-organization.dto";
import { AddUserDto } from "./oraganization.dto";
export declare class OrganizationsController {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    addUser(name: string, adminCode: string, userCode: string): Promise<{
        msg: string;
        result: import("mongoose").Document<unknown, {}, import("./organizations.model").Organization> & import("./organizations.model").Organization & Required<{
            _id: string;
        }>;
    }>;
    getAllOrganization(page?: number, limit?: number): Promise<{
        data: import("./organizations.model").Organization[];
        pagination: {
            total: number;
            totalPages: number;
            currentPage: number;
        };
    }>;
    updateOrganization(organizationId: string, updateOrganizationDto: UpdateOrganizationDto): Promise<import("./organizations.model").Organization>;
    deleteOrganization(organizationId: string): Promise<{
        message: string;
    }>;
    addUserToOrganization(req: any, addUserDto: AddUserDto): Promise<import("./organizations.model").Organization>;
    getOrganizationsByRole(page: number, limit: number, role: 'owner' | 'user', req: any): Promise<{
        data: any;
        pagination: {
            total: any;
            totalPages: number;
            currentPage: number;
        };
    }>;
}
