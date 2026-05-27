// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm'; // ✅ Import TypeOrmModule
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { HostModule } from '../host/host.module';
import { Host } from '../host/host.entity'; // ✅ Import Host entity
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Host]), // ✅ Make HostRepository available here
    HostModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10m' }, // Optional: set token expiration time
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
