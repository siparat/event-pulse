export namespace VenueCreatedIntegrationEvent {
	export const topic = 'inventory.venue-created.event';

	export class Request {
		id: string;
		name: string;
		address: string;
	}
}
