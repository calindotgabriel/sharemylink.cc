import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { RequestLoggerMiddleware } from './request-logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(new RequestLoggerMiddleware().use);

  // app.enableCors({
  //   origin: process.env.FRONTEND_URL || 'http://localhost',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: true,
  // });

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Swagger API')
      .setDescription('API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  const port = configService.get('PORT') || 3000;
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });

  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger UI is available on: http://localhost:${port}/api`);
}
bootstrap();
