export class InvalidSeatColException extends Error {
	constructor(column: number) {
		super(`${column} is not a valid column`);
	}
}
