import { Inject, Injectable } from '@nestjs/common';
import { OutboxRepository } from './database/write/repositories/outbox.repository';
import { EventBus } from '@nestjs/cqrs';
import { outboxRegistry } from './outbox.registry';
import { ClientProxy } from '@nestjs/microservices';
import { RmqQueues } from '@event-pulse/infrastructure';
import { DataSource } from 'typeorm';
import { OutboxModel } from './database/write/models/outbox.model';

@Injectable()
export class OutboxProcessor {
	constructor(
		private dataSource: DataSource,
		private outboxRepo: OutboxRepository,
		private eventBus: EventBus,
		@Inject(RmqQueues.INVENTORY) private clientProxy: ClientProxy
	) {}

	async process(): Promise<void> {
		await this.dataSource.transaction(async (manager) => {
			const outboxRepo = new OutboxRepository(manager.getRepository(OutboxModel));
			const records = await outboxRepo.findUnprocessed();
			for (const record of records) {
				const creator = outboxRegistry[record.type];
				const { topic, event } = creator(record.payload);

				await this.eventBus.publish(event);

				this.clientProxy.emit(topic, event);

				await outboxRepo.markProcessed(record.id);
			}
		});
	}
}
