import { DomainEvent } from '@event-pulse/domain';

export type OutboxRegistry = Record<string, (obj: object) => OutboxRegistryEvent>;

export interface OutboxRegistryEvent {
	topic: string;
	event: DomainEvent;
}
