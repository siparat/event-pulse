export class SeatMustBookedFirstException extends Error {
	constructor() {
		super('The seat must be booked first');
	}
}
