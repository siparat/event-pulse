import { VenueStatus } from './constants/vanue-status.constants';
import { Zone } from './entities/zone.entity';
import { VenueId } from './value-objects/venue-id.vo';
import { VenueName } from './value-objects/venue-name';

export class Venue {
	private domainEvents: object[] = [];

	private constructor(
		public id: VenueId,
		public address: string,
		public name: VenueName,
		private zones: Zone[],
		public status: VenueStatus
	) {}

	pullDomainEvents(): object[] {
		const events = [...this.domainEvents];
		this.domainEvents = [];
		return events;
	}
}
