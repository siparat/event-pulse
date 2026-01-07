import { OutboxRegistry } from '@event-pulse/infrastructure';
import { VenueCreatedEvent } from '../../venue/domain/events/venue-created.event';
import { VenueCreatedIntegrationEvent, VenueUpdatedIntegrationEvent } from '@event-pulse/contracts';
import { VenueUpdatedEvent } from '../../venue/domain/events/venue-updated.event';

export const outboxRegistry: OutboxRegistry = {
	[VenueCreatedEvent.name]: ({ id, name, address, occurredAt }: VenueCreatedEvent) => {
		const event = new VenueCreatedEvent(id, name, address);
		event.occurredAt = occurredAt;
		return {
			topic: VenueCreatedIntegrationEvent.topic,
			event
		};
	},
	[VenueUpdatedEvent.name]: ({ id, name, address, occurredAt }: VenueUpdatedEvent) => {
		const event = new VenueUpdatedEvent(id, name, address);
		event.occurredAt = occurredAt;
		return {
			topic: VenueUpdatedIntegrationEvent.topic,
			event
		};
	}
};
