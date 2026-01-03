import { Cron, CronExpression } from '@nestjs/schedule';
import { OutboxProcessor } from './outbox.processor';
import { Controller } from '@nestjs/common';

@Controller()
export class OutboxCron {
	constructor(private outboxProcessor: OutboxProcessor) {}

	@Cron(CronExpression.EVERY_5_SECONDS)
	async handleUnprocessed(): Promise<void> {
		await this.outboxProcessor.process();
	}
}
