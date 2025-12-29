import { DomainEvent } from './event.base';

export abstract class Aggregate {
	private domainEvents: DomainEvent[] = [];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	abstract toPrimitives(): any;

	protected addEvent(event: DomainEvent): void {
		this.domainEvents.push(event);
	}

	pullEvents(): DomainEvent[] {
		const events = [...this.domainEvents];
		this.domainEvents = [];
		return events;
	}
}
