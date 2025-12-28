import z from 'zod';
import { InvalidSeatIdException } from '../exceptions/invalid-seat-id.exception';

export class SeatId {
	constructor(private id: string) {
		if (!z.uuid().safeParse(id).success) {
			throw new InvalidSeatIdException();
		}
	}

	toString(): string {
		return this.id;
	}
}
