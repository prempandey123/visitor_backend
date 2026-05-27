import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HostService } from './host.service';
import { HostController } from './host.controller';
import { Host } from './host.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Host])],
  providers: [HostService],
  controllers: [HostController],
  exports: [HostService],
})
export class HostModule {}

