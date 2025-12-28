export class SeatAlreadyBookedException extends Error {
	constructor() {
		super('The seat is already occupied or booked');
	}
}
