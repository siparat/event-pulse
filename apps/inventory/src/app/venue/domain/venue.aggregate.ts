export class VenueAggregate {
	private domainEvents: object[] = [];

	private constructor() {}

	pullDomainEvents(): object[] {
		const events = [...this.domainEvents];
		this.domainEvents = [];
		return events;
	}
}
