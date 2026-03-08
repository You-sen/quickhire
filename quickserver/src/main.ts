import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  });

  // Enable validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // API prefix
  app.setGlobalPrefix('api');

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('QuickHire API')
    .setDescription('QuickHire Job Portal API - A comprehensive job posting and application management system')
    .setVersion('1.0.0')
    .setContact(
      'QuickHire Team',
      'https://quickhire.com',
      'support@quickhire.com'
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addTag('jobs', 'Job posting management endpoints')
    .addTag('applications', 'Job application management endpoints')
    .addServer('http://localhost:3001', 'Development Server')
    .addServer('https://api.quickhire.com', 'Production Server')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'QuickHire API Documentation',
    customfavIcon: 'https://quickhire.com/favicon.ico',
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
      syntaxHighlight: {
        activate: true,
        theme: 'monokai',
      },
    },
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 QuickHire API running on http://localhost:${port}/api`);
  console.log(`📊 Health check: http://localhost:${port}/api`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
