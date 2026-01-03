import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateVenueCommand } from './create-venue.command';
import { Venue } from '../../../domain/venue.aggregate';
import { VenueRepository } from '../../../domain/repositories/venue.repository';

@CommandHandler(CreateVenueCommand)
export class CreateVenueHandler implements ICommandHandler<CreateVenueCommand> {
	constructor(private venueRepository: VenueRepository) {}

	async execute({ address, name }: CreateVenueCommand): Promise<{ id: string }> {
		const venue = await Venue.register(address, name, this.venueRepository);
		await this.venueRepository.save(venue);
		return { id: venue.id };
	}
}
