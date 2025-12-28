export class InvalidZoneIdException extends Error {
	constructor(id: string) {
		super(`ZoneId: ${id} is invalid`);
	}
}
