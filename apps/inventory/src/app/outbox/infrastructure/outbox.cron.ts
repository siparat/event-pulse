import { Cron, CronExpression } from '@nestjs/schedule';
import { OutboxProcessor } from './outbox.processor';

export class OutboxCron {
	constructor(private outboxProcessor: OutboxProcessor) {}

	@Cron(CronExpression.EVERY_5_SECONDS)
	async handleUnprocessed(): Promise<void> {
		await this.outboxProcessor.process();
	}
}
