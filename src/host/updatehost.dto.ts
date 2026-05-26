// src/host/dto/update-host.dto.ts
import { IsEmail, IsString, IsInt, IsOptional } from 'class-validator';
import { Role } from 'src/enum/role.enum';

export class UpdateHostDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  number?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsInt()
  @IsOptional()
  roleId?: Role;
}
