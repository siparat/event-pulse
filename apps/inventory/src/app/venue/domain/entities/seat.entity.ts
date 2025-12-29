import { randomUUID } from 'crypto';
import { SeatCol } from '../value-objects/seat-col.vo';
import { SeatId } from '../value-objects/seat-id.vo';
import { SeatRow } from '../value-objects/seat-row.vo';
import { SeatStatus } from '../constants/seat-status.constants';
import { SeatAlreadyBookedException } from '../exceptions/seat-already-booked.exception';
import { SeatMustBookedFirstException } from '../exceptions/seat-must-booked-first.exception';
import { SeatReservedEvent } from '../events/seat-reserved.event';
import { Entity } from '@event-pulse/domain';
import { SeatReservationExpiredEvent } from '../events/seat-reservation-expired.event';

export interface SeatProps {
	id: SeatId;
	row: SeatRow;
	col: SeatCol;
	zoneId: string;
	status: SeatStatus;
	expiredAt?: Date;
}

export class Seat extends Entity {
	private readonly id: SeatId;
	private row: SeatRow;
	private col: SeatCol;
	private zoneId: string;
	private status: SeatStatus;
	private lockedUntil?: Date;

	private constructor(props: SeatProps) {
		super();

		this.id = props.id;
		this.row = props.row;
		this.col = props.col;
		this.zoneId = props.zoneId;
		this.status = props.status;
	}

	public reserve(minutes = 15): void {
		if (this.status !== SeatStatus.AVAILABLE) {
			throw new SeatAlreadyBookedException();
		}
		this.status = SeatStatus.RESERVED;
		this.lockedUntil = new Date(Date.now() + 60000 * minutes);
		this.addEvent(
			new SeatReservedEvent(this.id.toString(), this.zoneId, this.row.toInt(), this.col.toInt(), this.lockedUntil)
		);
	}

	public release(): void {
		this.status = SeatStatus.AVAILABLE;
		this.lockedUntil = undefined;
		this.addEvent(
			new SeatReservationExpiredEvent(this.id.toString(), this.zoneId, this.row.toInt(), this.col.toInt())
		);
	}

	public makeSold(): void {
		if (this.status !== SeatStatus.RESERVED) {
			throw new SeatMustBookedFirstException();
		}
		this.status = SeatStatus.SOLD;
		this.lockedUntil = undefined;
	}

	static register(row: number, col: number, zoneId: string): Seat {
		return new Seat({
			id: new SeatId(randomUUID()),
			row: new SeatRow(row),
			col: new SeatCol(col),
			zoneId: zoneId,
			status: SeatStatus.AVAILABLE
		});
	}

	static restore(props: SeatProps): Seat {
		return new Seat(props);
	}

	toPrimitives() {
		return {
			id: this.id.toString(),
			row: this.row.toInt(),
			col: this.col.toInt(),
			zoneId: this.zoneId,
			status: this.status
		};
	}
}
