import { Command } from '@nestjs/cqrs';

export class CreateVenueCommand extends Command<{ id: string }> {
	constructor(
		public readonly name: string,
		public readonly address: string
	) {
		super();
	}
}
