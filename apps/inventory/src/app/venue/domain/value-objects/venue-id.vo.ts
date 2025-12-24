import { UUID } from 'crypto';
import z from 'zod';
import { InvalidVenueIdException } from '../exceptions/invalid-venue-id.exception';

export class VenueIdVO {
	constructor(public uuid: UUID) {
		if (!z.uuid().safeParse(uuid).success) {
			throw new InvalidVenueIdException();
		}
	}
}
