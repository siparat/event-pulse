import { Aggregate } from '@event-pulse/domain';
import { VenueStatus } from './constants/vanue-status.constants';
import { Zone } from './entities/zone.entity';
import { VenueId } from './value-objects/venue-id.vo';
import { VenueName } from './value-objects/venue-name';
import { randomUUID } from 'crypto';
import { ZoneWithThisNameAlreadyExists } from './exceptions/zone-with-this-name-already-exists.exception';
import { VenueCreatedEvent } from './events/venue-created.event';
import { VenueInUsedException } from './exceptions/venue-in-used.exception';
import { VenueAchivedEvent } from './events/venue-closed.event';
import { VenueArchivedException } from './exceptions/venue-achived.exception';
import { VenueIsOpenedForEventsEvent } from './events/venue-is-opened-for-events.event';
import { NeedToOpenVenueFirst } from './exceptions/need-to-open-venue-first.exception';
import { VenueUsedEvent } from './events/venue-used.event';
import { NeedToCloseForMaintenanceVenueFirst } from './exceptions/need-to-close-for-maintenance-venue-first.exception';

interface VenueProps {
	id: VenueId;
	address: string;
	name: VenueName;
	status: VenueStatus;
	zones: Zone[];
}

export class Venue extends Aggregate {
	private id: VenueId;
	private address: string;
	private name: VenueName;
	private zones: Zone[];
	private status: VenueStatus;
	private eventId?: string;

	private constructor(props: VenueProps) {
		super();

		this.id = props.id;
		this.address = props.address;
		this.name = props.name;
		this.status = props.status;
		this.zones = props.zones;
	}

	archive(): void {
		if (this.status == VenueStatus.ARCHIVED) {
			return;
		}
		if (this.status == VenueStatus.IN_USED) {
			throw new VenueInUsedException(this.name.toString());
		}
		this.status = VenueStatus.ARCHIVED;
		this.addEvent(new VenueAchivedEvent(this.id.toString()));
	}

	open(): void {
		if (this.status == VenueStatus.OPENED) {
			return;
		}
		if (this.status == VenueStatus.ARCHIVED) {
			throw new VenueArchivedException(this.name.toString());
		}
		this.status = VenueStatus.OPENED;
		this.eventId = undefined;
		this.addEvent(new VenueIsOpenedForEventsEvent(this.id.toString(), this.address, this.name.toString()));
	}

	use(eventId: string): void {
		if (this.status == VenueStatus.ARCHIVED) {
			throw new VenueArchivedException(this.name.toString());
		}
		if (this.status == VenueStatus.IN_USED) {
			throw new VenueInUsedException(this.name.toString());
		}
		if (this.status !== VenueStatus.OPENED) {
			throw new NeedToOpenVenueFirst(this.name.toString());
		}
		this.eventId = eventId;
		this.status = VenueStatus.IN_USED;
		this.addEvent(new VenueUsedEvent(this.id.toString(), eventId));
	}

	closeForMaintenance(): void {
		if (this.status == VenueStatus.IN_USED) {
			throw new VenueInUsedException(this.name.toString());
		}

		this.status = VenueStatus.IN_MAINTENANCE;
		this.eventId = undefined;
	}

	addZone(name: string, cols: number, rows: number): void {
		if (![VenueStatus.DRAFT, VenueStatus.IN_MAINTENANCE].includes(this.status)) {
			throw new NeedToCloseForMaintenanceVenueFirst(this.name.toString());
		}
		const isNameDuplicate = this.zones.some((z) => z.name === name);
		if (isNameDuplicate) {
			throw new ZoneWithThisNameAlreadyExists(name);
		}

		const newZone = Zone.register(this.id.toString(), name, cols, rows);
		this.zones.push(newZone);
	}

	static restore(props: VenueProps): Venue {
		return new Venue(props);
	}

	static register(address: string, name: string): Venue {
		const venue = new Venue({
			id: new VenueId(randomUUID()),
			address,
			name: new VenueName(name),
			zones: [],
			status: VenueStatus.DRAFT
		});

		venue.addEvent(new VenueCreatedEvent(venue.id.toString()));

		return venue;
	}

	toPrimitives() {
		return {
			id: this.id.toString(),
			address: this.address,
			name: this.name.toString(),
			zones: this.zones.map((z) => z.toPrimitives()),
			eventId: this.eventId
		};
	}
}
