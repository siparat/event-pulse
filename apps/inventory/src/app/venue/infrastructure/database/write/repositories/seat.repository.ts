import { InjectRepository } from '@nestjs/typeorm';
import { SeatModel } from '../models/seat.model';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Seat } from '../../../../domain/entities/seat.entity';

@Injectable()
export class SeatRepository {
	constructor(@InjectRepository(SeatModel) private repo: Repository<SeatModel>) {}

	// async save(seat: Seat): Promise<SeatModel> {}
}
