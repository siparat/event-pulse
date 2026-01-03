export abstract class DomainEvent {
	occurredAt: Date;

	protected constructor() {
		this.occurredAt = new Date();
	}
}
