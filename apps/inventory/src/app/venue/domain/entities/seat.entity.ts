import { randomUUID } from 'crypto';
import { SeatColVO } from '../value-objects/seat-col.vo';
import { SeatIdVO } from '../value-objects/seat-id.vo';
import { SeatRowVO } from '../value-objects/seat-row.vo';
import { SeatStatus } from '../constants/seat-status.constants';

export class Seat {
	private constructor(
		private readonly id: SeatIdVO,
		private row: SeatRowVO,
		private col: SeatColVO,
		private status: SeatStatus
	) {}

	static register(row: number, col: number): Seat {
		return new Seat(new SeatIdVO(randomUUID()), new SeatRowVO(row), new SeatColVO(col), SeatStatus.AVAILABLE);
	}

	static restore(id: string, row: number, col: number, status: SeatStatus): Seat {
		return new Seat(new SeatIdVO(id), new SeatRowVO(row), new SeatColVO(col), status);
	}
}
