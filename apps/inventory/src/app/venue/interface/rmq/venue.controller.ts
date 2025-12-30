import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InventoryCreateVenue } from '@event-pulse/contracts';
import { CommandBus } from '@nestjs/cqrs';
import { CreateVenueCommand } from '../../application/create-venue/create-venue.command';

@Controller()
export class VenueController {
	constructor(private commandBus: CommandBus) {}

	@MessagePattern(InventoryCreateVenue.topic)
	async createVenue(@Payload() data: InventoryCreateVenue.Request): Promise<InventoryCreateVenue.Response> {
		return this.commandBus.execute(new CreateVenueCommand(data.name, data.address));
	}
}
