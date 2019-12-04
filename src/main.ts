import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  const nunjucks = require('nunjucks');

  nunjucks.configure(['views', 'views/macros'], {
    autoescape: true,
    express: app,
  });

  nunjucks.installJinjaCompat();

  app.setViewEngine('njk');

  await app.listen(3000);
}
bootstrap();
