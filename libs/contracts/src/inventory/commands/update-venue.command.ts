import z from 'zod';
import { CreateVenueIntegrationCommand } from './create-venue.command';

export namespace UpdateVenueIntegrationCommand {
	export const topic = 'inventory.update-venue.command';

	export const RequestSchema = z.object({
		id: z.uuid(),
		data: CreateVenueIntegrationCommand.RequestSchema
	});

	export type Request = z.infer<typeof RequestSchema>;

	export class Response {
		id: string;
	}
}
