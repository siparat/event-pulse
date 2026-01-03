import { InjectRepository } from '@nestjs/typeorm';
import { VenueModel } from '../models/venue.model';
import { DataSource, Repository } from 'typeorm';
import { Venue } from '../../../../domain/venue.aggregate';
import { Injectable } from '@nestjs/common';
import { VenueRepository } from '../../../../domain/repositories/venue.repository';
import { VenueMapper } from '../mappers/venue.mapper';
import { OutboxModel } from '../../../../../outbox/infrastructure/database/write/models/outbox.model';
import { OutboxMapper } from '../../../../../outbox/infrastructure/database/write/mappers/outbox.mapper';

@Injectable()
export class TypeormVenueRepository implements VenueRepository {
	constructor(
		@InjectRepository(VenueModel) private repo: Repository<VenueModel>,
		private dataSource: DataSource
	) {}

	async save(venue: Venue): Promise<void> {
		const events = venue.pullEvents();
		await this.dataSource.transaction(async (manager): Promise<void> => {
			await manager.save(VenueModel, venue.toPrimitives());
			await manager.save(OutboxModel, events.map(OutboxMapper.toPersistence));
		});
	}

	async findByAddress(address: string): Promise<Venue | null> {
		const venue = await this.repo.findOne({ where: { address } });
		return venue && VenueMapper.toDomain(venue);
	}

	async existsByAddress(address: string): Promise<boolean> {
		return this.repo.exists({ where: { address } });
	}
}
