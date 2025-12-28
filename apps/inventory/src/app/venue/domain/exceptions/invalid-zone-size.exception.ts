export class InvalidZoneSizeException extends Error {
	constructor() {
		super('The size of the zone must be positive numbers');
	}
}
