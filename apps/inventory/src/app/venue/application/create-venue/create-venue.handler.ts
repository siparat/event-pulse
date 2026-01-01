import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateVenueCommand } from './create-venue.command';
import { Venue } from '../../domain/venue.aggregate';
import { VenueRepository } from '../../infrastructure/database/write/repositories/venue.repository';

@CommandHandler(CreateVenueCommand)
export class CreateVenueHandler implements ICommandHandler<CreateVenueCommand> {
	constructor(
		private venueRepository: VenueRepository,
		private eventBus: EventBus
	) {}

	async execute({ address, name }: CreateVenueCommand): Promise<{ id: string }> {
		const venue = await Venue.register(address, name, this.venueRepository);
		await this.venueRepository.save(venue);
		await this.eventBus.publish(venue.pullEvents());
		return { id: venue.id };
	}
}
