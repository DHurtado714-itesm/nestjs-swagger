import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getPizzasOpenAPIObject } from './utils/swagger/get-pizzas-open-api-object.swagger';
import { getBurgersOpenAPIObject } from './utils/swagger/get-burgers-open-api-object.swagger';
import metadata from './metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Pizza example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  await SwaggerModule.loadPluginMetadata(metadata);
  const globalDocument = SwaggerModule.createDocument(app, config);

  // Pizza API documentation
  const developmentDocsApiEndpoint = 'api/docs/pizzas';
  const pizzasOpenAPIObject = getPizzasOpenAPIObject(globalDocument);
  SwaggerModule.setup(developmentDocsApiEndpoint, app, pizzasOpenAPIObject);

  // Burger API documentation
  const partnerDocsApiEndpoint = 'api/docs/burgers';
  const burgersOpenAPIObject = getBurgersOpenAPIObject(globalDocument);
  SwaggerModule.setup(partnerDocsApiEndpoint, app, burgersOpenAPIObject);

  await app.listen(3000);
}
bootstrap();
