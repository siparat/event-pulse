import { DomainEvent } from '@event-pulse/domain';

export class VenueCreatedEvent extends DomainEvent {
	constructor(
		public id: string,
		public name: string,
		public address: string
	) {
		super();
	}
}
