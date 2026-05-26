import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitorModule } from './visitor/visitor.module';
import { HostModule } from './host/host.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Premp7@196',
    database: 'bbb',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,
  }), VisitorModule, HostModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
