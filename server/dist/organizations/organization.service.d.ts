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
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { Organization } from "./organizations.model";
import { AddUserDto } from "./oraganization.dto";
export declare class OrganizationService {
    private readonly organizationModel;
    constructor(organizationModel: Model<Organization>);
    createOrganization(name: string, adminCode: string, userCode: string): Promise<import("mongoose").Document<unknown, {}, Organization> & Organization & Required<{
        _id: string;
    }>>;
    getAllOrganization(page?: number, limit?: number): Promise<[Organization[], number]>;
    updateOrganization(organizationId: string, updatedData: Partial<Organization>): Promise<Organization | null>;
    deleteOrganization(organizationId: string): Promise<Organization | null>;
    addUserToOrganization(addUserDto: AddUserDto, userId: string): Promise<Organization | null>;
    getOrganizationsByRole(page: number, limit: number, userId: string, role: 'user' | 'owner'): Promise<any>;
    isUserOrganizationOwner(organizationId: any, userId: any): Promise<boolean>;
}
