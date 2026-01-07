import { DomainEvent } from '@event-pulse/domain';

export class VenueUpdatedEvent extends DomainEvent {
	constructor(
		public id: string,
		public name: string,
		public address: string
	) {
		super();
	}
}
