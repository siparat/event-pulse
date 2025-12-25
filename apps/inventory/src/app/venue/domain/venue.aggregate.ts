import { VenueStatus } from './constants/vanue-status.constants';
import { ZoneEntity } from './entities/zone.entity';
import { VenueIdVO } from './value-objects/venue-id.vo';
import { VenueNameVO } from './value-objects/venue-name';

export class VenueAggregate {
	private domainEvents: object[] = [];

	private constructor(
		public id: VenueIdVO,
		public address: string,
		public name: VenueNameVO,
		private zones: ZoneEntity[],
		public status: VenueStatus
	) {}

	pullDomainEvents(): object[] {
		const events = [...this.domainEvents];
		this.domainEvents = [];
		return events;
	}
}
