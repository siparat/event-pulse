import { randomUUID } from 'crypto';
import { SeatColVO } from '../value-objects/seat-col.vo';
import { SeatIdVO } from '../value-objects/seat-id.vo';
import { SeatRowVO } from '../value-objects/seat-row.vo';
import { SeatStatus } from '../constants/seat-status.constants';
import { SeatAlreadyBookedException } from '../exceptions/seat-already-booked.exception';
import { SeatMustBookedFirstException } from '../exceptions/seat-must-booked-first.exception';

interface SeatProps {
	id: SeatIdVO;
	row: SeatRowVO;
	col: SeatColVO;
	zoneId: string;
	status: SeatStatus;
}

export class Seat {
	private readonly id: SeatIdVO;
	private row: SeatRowVO;
	private col: SeatColVO;
	private zoneId: string;
	private status: SeatStatus;

	private constructor(props: SeatProps) {
		this.id = props.id;
		this.row = props.row;
		this.col = props.col;
		this.zoneId = props.zoneId;
		this.status = props.status;
	}

	public reserve(): void {
		if (this.status !== SeatStatus.AVAILABLE) {
			throw new SeatAlreadyBookedException();
		}
		this.status = SeatStatus.RESERVED;
	}

	public release(): void {
		this.status = SeatStatus.AVAILABLE;
	}

	public makeSold(): void {
		if (this.status !== SeatStatus.RESERVED) {
			throw new SeatMustBookedFirstException();
		}
		this.status = SeatStatus.SOLD;
	}

	static register(row: number, col: number, zoneId: string): Seat {
		return new Seat({
			id: new SeatIdVO(randomUUID()),
			row: new SeatRowVO(row),
			col: new SeatColVO(col),
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
