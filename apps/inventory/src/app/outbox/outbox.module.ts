import { Module } from '@nestjs/common';
import { OutboxRepository } from './infrastructure/database/write/repositories/outbox.repository';
import { OutboxProcessor } from './infrastructure/outbox.processor';
import { OutboxCron } from './infrastructure/outbox.cron';
import { OutboxModel } from './infrastructure/database/write/models/outbox.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([OutboxModel])],
	controllers: [OutboxCron],
	providers: [OutboxRepository, OutboxProcessor]
})
export class OutboxModule {}
