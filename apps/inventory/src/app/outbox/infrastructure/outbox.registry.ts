import { OutboxRegistry } from '@event-pulse/infrastructure';
import { VenueCreatedEvent } from '../../venue/domain/events/venue-created.event';
import { VenueCreatedIntegrationEvent } from '@event-pulse/contracts';

export const outboxRegistry: OutboxRegistry = {
	[VenueCreatedEvent.name]: ({ id, name, address, occurredAt }: VenueCreatedEvent) => {
		const event = new VenueCreatedEvent(id, name, address);
		event.occurredAt = occurredAt;
		return {
			topic: VenueCreatedIntegrationEvent.topic,
			event
		};
	}
};
