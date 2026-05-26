// src/host/dto/create-host.dto.ts
import { IsEmail, IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Role } from 'src/enum/role.enum';

export class CreateHostDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsInt()
  roleId: Role;
}
