import { Command } from '@nestjs/cqrs';
import { UpdateVenueProps } from '../../../domain/interfaces/update-venue-props.interface';

export class UpdateVenueCommand extends Command<{ id: string }> {
	constructor(
		public venueId: string,
		public dto: UpdateVenueProps
	) {
		super();
	}
}
