// add-user.dto.ts

import { IsIn, IsString, IsNotEmpty } from 'class-validator';

export class AddUserDto {
    @IsNotEmpty()
    @IsString()
    readonly type: 'owner' | 'user';

    @IsNotEmpty()
    @IsString()
    readonly code: string;
}
