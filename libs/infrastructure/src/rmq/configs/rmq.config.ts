import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

export const getRmqConfig = (config: ConfigService, queue: string): RmqOptions => ({
	transport: Transport.RMQ,
	options: {
		exchange: config.get('RMQ_EXCHANGE'),
		queue,
		urls: [
			{
				username: config.get('RMQ_USER'),
				password: config.get('RMQ_PASSWORD'),
				hostname: config.get('RMQ_HOST'),
				port: config.get('RMQ_PORT')
			}
		]
	}
});
