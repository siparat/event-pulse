export class InvalidVenueNameException extends Error {
	constructor(name: string) {
		super(`Vanue name (${name}) is invalid`);
	}
}
