import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { getRmqConfig, RmqQueues } from '@event-pulse/infrastructure';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	const config = app.get(ConfigService);
	const rmqConfig = getRmqConfig(config, RmqQueues.SALES);
	app.close();

	const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, rmqConfig);
	await microservice.listen();
}

bootstrap();
