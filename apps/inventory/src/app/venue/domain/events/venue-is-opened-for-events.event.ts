import { DomainEvent } from '@event-pulse/domain';

export class VenueIsOpenedForEventsEvent extends DomainEvent {
	constructor(
		public id: string,
		public address: string,
		public name: string
	) {
		super();
	}
}
