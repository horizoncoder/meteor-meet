// login-user.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
