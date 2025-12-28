import { InvalidSeatRowException } from '../exceptions/invalid-seat-row.exception';

export class SeatRow {
	constructor(private row: number) {
		if (row <= 0) {
			throw new InvalidSeatRowException(row);
		}
	}

	toInt(): number {
		return this.row;
	}
}
