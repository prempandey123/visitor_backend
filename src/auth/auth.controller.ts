import { Controller, Post, Body, ValidationPipe, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateHostDto } from 'src/host/createhost.dto';
import { Host } from '../host/host.entity';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body(ValidationPipe) createHostDto: CreateHostDto): Promise<Host> {
    return this.authService.register(createHostDto);
  }

  @Post('login')
async login(@Body() loginDto: LoginDto) {
  const host = await this.authService.validateUser(loginDto.email, loginDto.password);
  if (!host) {
    throw new UnauthorizedException('Invalid credentials');
  }
  return this.authService.login(host);
}

}
