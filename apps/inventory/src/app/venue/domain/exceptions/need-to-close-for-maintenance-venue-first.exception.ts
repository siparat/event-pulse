export class NeedToCloseForMaintenanceVenueFirst extends Error {
	constructor(name: string) {
		super(`To manage the zones ${name}, you must first close the site for maintenance.`);
	}
}
