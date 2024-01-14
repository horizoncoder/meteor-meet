// update-organization.dto.ts

import { IsString, IsOptional } from 'class-validator';

export class UpdateOrganizationDto {
    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsString()
    readonly adminCode?: string;

    @IsOptional()
    @IsString()
    readonly userCode?: string;

}
