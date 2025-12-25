export class InvalidSeatRowException extends Error {
	constructor(row: number) {
		super(`${row} is not a valid row`);
	}
}
