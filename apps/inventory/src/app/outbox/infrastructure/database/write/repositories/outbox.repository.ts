import { Injectable } from '@nestjs/common';
import { OutboxModel } from '../models/outbox.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OutboxRepository {
	constructor(@InjectRepository(OutboxModel) private repo: Repository<OutboxModel>) {}

	findUnprocessed(): Promise<OutboxModel[]> {
		return this.repo
			.createQueryBuilder('outbox')
			.where('outbox.published IS FALSE')
			.orderBy('outbox.occurredAt', 'ASC')
			.setLock('pessimistic_write')
			.setOnLocked('skip_locked')
			.getMany();
	}

	async markProcessed(id: number): Promise<void> {
		await this.repo.update({ id }, { published: true });
	}
}
