import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModuleAsyncOptions, RmqOptions } from '@nestjs/microservices';
import { getRmqConfig } from './rmq.config';

export const getRmqClientConfig = (queue: string): ClientsModuleAsyncOptions => ({
	isGlobal: true,
	clients: [
		{
			imports: [ConfigModule],
			inject: [ConfigService],
			name: queue,
			useFactory: (config): RmqOptions => getRmqConfig(config, queue)
		}
	]
});
