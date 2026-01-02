import z from 'zod';

export namespace CreateVenueIntegrationCommand {
	export const topic = 'inventory.create-venue.command';

	export const RequestSchema = z.object({
		address: z.string().min(1),
		name: z.string().min(1).max(64)
	});

	export type Request = z.infer<typeof RequestSchema>;

	export class Response {
		id: string;
	}
}
