import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { VenueCreatedEvent } from '../../../domain/events/venue-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(VenueCreatedEvent)
export class VenueCreatedHandler implements IEventHandler<VenueCreatedEvent> {
	handle(event: VenueCreatedEvent): void {
		Logger.log(event);
	}
}
