import z from 'zod';
import { InvalidZoneIdException } from '../exceptions/invalid-zone-id.exception';

export class ZoneIdVO {
	constructor(private id: string) {
		if (!z.uuid().safeParse(id).success) {
			throw new InvalidZoneIdException(id);
		}
	}

	toString(): string {
		return this.id;
	}
}
