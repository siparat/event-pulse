import { InjectRepository } from '@nestjs/typeorm';
import { VenueModel } from '../models/venue.model';
import { Repository } from 'typeorm';
import { Venue } from '../../../../domain/venue.aggregate';
import { Injectable } from '@nestjs/common';
import { VenueRepository } from '../../../../domain/repositories/venue.repository';
import { VenueMapper } from '../mappers/venue.mapper';

@Injectable()
export class TypeormVenueRepository implements VenueRepository {
	constructor(@InjectRepository(VenueModel) private repo: Repository<VenueModel>) {}

	async save(venue: Venue): Promise<void> {
		await this.repo.save(venue.toPrimitives());
	}

	async findByAddress(address: string): Promise<Venue | null> {
		const venue = await this.repo.findOne({ where: { address } });
		return venue && VenueMapper.toDomain(venue);
	}

	async existsByAddress(address: string): Promise<boolean> {
		return this.repo.exists({ where: { address } });
	}
}
