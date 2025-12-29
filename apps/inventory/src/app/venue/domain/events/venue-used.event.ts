import { DomainEvent } from '@event-pulse/domain';

export class VenueUsedEvent extends DomainEvent {
	constructor(
		public venueId: string,
		public eventId: string
	) {
		super();
	}
}
