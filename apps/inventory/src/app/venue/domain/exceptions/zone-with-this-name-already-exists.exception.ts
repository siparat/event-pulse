export class ZoneWithThisNameAlreadyExists extends Error {
	constructor(name: string) {
		super(`The zone with the name ${name} already exists on this venue`);
	}
}
