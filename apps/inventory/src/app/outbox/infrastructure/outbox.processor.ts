import { Inject, Injectable } from '@nestjs/common';
import { OutboxRepository } from './database/write/repositories/outbox.repository';
import { EventBus } from '@nestjs/cqrs';
import { outboxRegistry } from './outbox.registry';
import { ClientProxy } from '@nestjs/microservices';
import { RmqQueues } from '@event-pulse/infrastructure';

@Injectable()
export class OutboxProcessor {
	constructor(
		private outboxRepo: OutboxRepository,
		private eventBus: EventBus,
		@Inject(RmqQueues.INVENTORY) private clientProxy: ClientProxy
	) {}

	async process(): Promise<void> {
		const events = await this.outboxRepo.findUnprocessed();

		for (const record of events) {
			const creator = outboxRegistry[record.type];
			const { topic, event } = creator(record.payload);

			await this.eventBus.publish(event);
			this.clientProxy.emit(topic, event);

			await this.outboxRepo.markProcessed(record.id);
		}
	}
}
