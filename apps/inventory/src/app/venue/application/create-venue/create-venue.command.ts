import { Command } from '@nestjs/cqrs';
import { Venue } from '../../domain/venue.aggregate';

export class CreateVenueCommand extends Command<Pick<Venue, 'id'>> {
	constructor(
		public readonly name: string,
		public readonly address: string
	) {
		super();
	}
}
