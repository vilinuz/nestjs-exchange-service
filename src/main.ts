import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
      .setTitle('Loan Enquiry API')
      .setDescription('Loan Enquiry API for the Loan Enquiry Service')
      .setVersion('1.0')
      .addTag('loans')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3002);
}
bootstrap().then(() => {
  Logger.log(`🚀 Application is running on port 3002`);
});
