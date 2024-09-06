import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const pizzaConfig = new DocumentBuilder()
    .setTitle('Pizza example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('pizzas')
    .build();
  const pizzaDocument = SwaggerModule.createDocument(app, pizzaConfig);
  SwaggerModule.setup('api/pizza', app, pizzaDocument);

  const burgerConfig = new DocumentBuilder()
    .setTitle('Burgers example')
    .setDescription('The burgers API description')
    .setVersion('1.0')
    .addTag('burgers')
    .build();
  const burgerDocument = SwaggerModule.createDocument(app, burgerConfig);
  SwaggerModule.setup('api/burgers', app, burgerDocument);

  await app.listen(3000);
}
bootstrap();
