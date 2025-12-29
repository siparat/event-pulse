export class VenueArchivedException extends Error {
	constructor(name: string) {
		super(`The venue ${name} has been archived and can no longer be used`);
	}
}
