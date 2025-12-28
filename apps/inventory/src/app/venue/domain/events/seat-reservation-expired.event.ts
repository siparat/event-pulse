import { DomainEvent } from '@event-pulse/domain';

export class SeatReservationExpiredEvent extends DomainEvent {
	constructor(
		public seatId: string,
		public zoneId: string,
		public row: number,
		public col: number
	) {
		super();
	}
}
