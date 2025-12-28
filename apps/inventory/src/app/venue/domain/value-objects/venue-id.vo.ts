import { UUID } from 'crypto';
import z from 'zod';
import { InvalidVenueIdException } from '../exceptions/invalid-venue-id.exception';

export class VenueId {
	constructor(private id: UUID) {
		if (!z.uuid().safeParse(id).success) {
			throw new InvalidVenueIdException();
		}
	}

	toString(): string {
		return this.id;
	}
}
