import { DomainEvent } from '@event-pulse/domain';

export class SeatReservedEvent extends DomainEvent {
	constructor(
		public seatId: string,
		public zoneId: string,
		public row: number,
		public col: number,
		public lockedUntil: Date
	) {
		super();
	}
}
