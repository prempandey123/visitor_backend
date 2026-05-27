import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cert'),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions, // ✅ HTTPS setup
  });

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: ['https://192.168.5.137:5173', 'https://localhost:5173'], // ✅ https origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

  await app.listen(3000, '0.0.0.0'); // ✅ 0.0.0.0 for network access
}
bootstrap();
