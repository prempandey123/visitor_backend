import { IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateVisitorDto {
  @IsString()
  visitorName: string;

  @IsString()
  companyName: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  number: string;

  @IsString()
  purposeOfVisit: string;

  @IsString()
  hostName: string;

  @IsString()
  visitorImage: string;

  @IsOptional()
  @IsString()
  checkInTime?: string;

  @IsOptional()
  @IsString()
  checkOutTime?: string;
}
