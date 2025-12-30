import { InjectRepository } from '@nestjs/typeorm';
import { VenueModel } from '../models/venue.model';
import { Repository } from 'typeorm';
import { Venue } from '../../../../domain/venue.aggregate';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VenueRepository {
	constructor(@InjectRepository(VenueModel) private repo: Repository<VenueModel>) {}

	async save(venue: Venue): Promise<VenueModel> {
		return this.repo.save(venue.toPrimitives());
	}

	async findByAddress(address: string): Promise<VenueModel | null> {
		return this.repo.findOne({ where: { address } });
	}
}
