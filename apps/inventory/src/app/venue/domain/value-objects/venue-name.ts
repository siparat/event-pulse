import z from 'zod';
import { InvalidVenueNameException } from '../exceptions/invalid-venue-name.exception';

export class VenueNameVO {
	constructor(public name: string) {
		if (!z.string().min(1).max(64).safeParse(name).success) {
			throw new InvalidVenueNameException(name);
		}
	}
}
