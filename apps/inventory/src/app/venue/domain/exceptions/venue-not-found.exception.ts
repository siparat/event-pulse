export class VenueNotFoundException extends Error {
	constructor(id: string) {
		super(`Venue with id ${id} was not found`);
	}
}
