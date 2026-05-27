import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateHostDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsString({ message: 'Number must be a string' })
  number: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString({ message: 'Designation must be a string' })
  designation: string;

  @IsString({ message: 'Department must be a string' })
  department: string;
}
