import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateVenueCommand } from './update-venue.command';
import { VenueRepository } from '../../../domain/repositories/venue.repository';
import { VenueNotFoundException } from '../../../domain/exceptions/venue-not-found.exception';

@CommandHandler(UpdateVenueCommand)
export class UpdateVenueHandler implements ICommandHandler<UpdateVenueCommand> {
	constructor(private venueRepository: VenueRepository) {}

	async execute({ venueId, dto }: UpdateVenueCommand): Promise<{ id: string }> {
		const venue = await this.venueRepository.findById(venueId);
		if (!venue) {
			throw new VenueNotFoundException(venueId);
		}

		await venue.update(dto, this.venueRepository);
		await this.venueRepository.save(venue);
		return { id: venue.id };
	}
}
