// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HostModule } from './host/host.module';
import { VisitorModule } from './visitor/visitor.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Premp7@196',
      database: 'visitor',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryAttempts: 5,   // retry 5 times
    retryDelay: 3000,   // 3 sec delay
    }),
    VisitorModule, HostModule, AuthModule
  ],
})
export class AppModule {}
