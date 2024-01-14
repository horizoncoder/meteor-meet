import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrganizationsController } from "./organizations.controller";
import { OrganizationService } from "./organization.service";
import {OrganizationSchema} from "./organizations.model";

@Module({
    imports: [MongooseModule.forFeature([{name: 'organization', schema: OrganizationSchema}])],
    controllers: [OrganizationsController],
    providers: [OrganizationService],
    exports: [OrganizationService]
})

export class OrganizationsModule {}

