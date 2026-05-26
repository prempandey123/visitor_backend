import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Host } from './host.entity';
import { HostController } from './host.controller';
import { HostService } from './host.service';


@Module({
  imports: [TypeOrmModule.forFeature([Host])],
  providers: [HostService],
  controllers: [HostController],
})
export class HostModule {}
