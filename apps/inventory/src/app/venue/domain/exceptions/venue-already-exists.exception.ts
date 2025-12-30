export class VenueAlreadyExistsException extends Error {
	constructor(address: string) {
		super(`The venue with the ${address} address already exists`);
	}
}
