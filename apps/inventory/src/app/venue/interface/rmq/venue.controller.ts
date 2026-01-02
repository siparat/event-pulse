import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateVenueIntegrationCommand } from '@event-pulse/contracts';
import { CommandBus } from '@nestjs/cqrs';
import { CreateVenueCommand } from '../../application/commands/create-venue/create-venue.command';

@Controller()
export class VenueController {
	constructor(private commandBus: CommandBus) {}

	@MessagePattern(CreateVenueIntegrationCommand.topic)
	async createVenue(
		@Payload() data: CreateVenueIntegrationCommand.Request
	): Promise<CreateVenueIntegrationCommand.Response> {
		return this.commandBus.execute(new CreateVenueCommand(data.name, data.address));
	}
}
