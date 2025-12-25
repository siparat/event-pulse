import z from 'zod';
import { InvalidSeatIdException } from '../exceptions/invalid-seat-id.exception';

export class SeatIdVO {
	constructor(private id: string) {
		if (!z.uuid().safeParse(id).success) {
			throw new InvalidSeatIdException();
		}
	}

	toString(): string {
		return this.id;
	}
}
