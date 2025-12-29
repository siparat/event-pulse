export class NeedToOpenVenueFirst extends Error {
	constructor(name: string) {
		super(`To use the ${name} venue, you must first open it`);
	}
}
