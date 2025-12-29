import { DomainEvent } from '@event-pulse/domain';

export class VenueAchivedEvent extends DomainEvent {
	constructor(public id: string) {
		super();
	}
}
