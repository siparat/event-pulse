export namespace VenueUpdatedIntegrationEvent {
	export const topic = 'inventory.venue-updated.event';

	export class Request {
		id: string;
		name: string;
		address: string;
	}
}
