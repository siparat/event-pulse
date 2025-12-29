export class VenueInUsedException extends Error {
	constructor(name: string) {
		super(`The venue ${name} is currently in use`);
	}
}
