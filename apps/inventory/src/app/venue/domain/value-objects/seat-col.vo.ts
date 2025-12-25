import { InvalidSeatColException } from '../exceptions/invalid-seat-col.exception';

export class SeatColVO {
	constructor(private col: number) {
		if (col <= 0) {
			throw new InvalidSeatColException(col);
		}
	}

	toInt(): number {
		return this.col;
	}
}
