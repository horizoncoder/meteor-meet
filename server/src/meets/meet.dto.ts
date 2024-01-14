// create-meet.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMeetDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    organizationId: string;
}
