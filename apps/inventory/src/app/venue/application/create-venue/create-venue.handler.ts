import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateVenueCommand } from './create-venue.command';
import { Venue } from '../../domain/venue.aggregate';
import { VenueRepository } from '../../infrastructure/database/write/repositories/venue.repository';
import { VenueAlreadyExistsException } from '../../domain/exceptions/venue-already-exists.exception';

@CommandHandler(CreateVenueCommand)
export class CreateVenueHandler implements ICommandHandler<CreateVenueCommand> {
	constructor(
		private venueRepository: VenueRepository,
		private eventBus: EventBus
	) {}

	async execute({ address, name }: CreateVenueCommand): Promise<Pick<Venue, 'id'>> {
		const venueWithThisAddress = await this.venueRepository.findByAddress(address);
		if (venueWithThisAddress) {
			throw new VenueAlreadyExistsException(address);
		}
		const venue = Venue.register(address, name);
		await this.venueRepository.save(venue);
		await this.eventBus.publish(venue.pullEvents());
		return { id: venue.id };
	}
}
