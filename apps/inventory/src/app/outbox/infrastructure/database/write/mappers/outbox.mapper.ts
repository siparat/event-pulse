import { DomainEvent } from '@event-pulse/domain';
import { OutboxModel } from '../models/outbox.model';

export class OutboxMapper {
	static toPersistence(event: DomainEvent): OutboxModel {
		const model = new OutboxModel();
		model.occurredAt = event.occurredAt;
		model.type = event.constructor.name;
		model.payload = event;
		return model;
	}
}
