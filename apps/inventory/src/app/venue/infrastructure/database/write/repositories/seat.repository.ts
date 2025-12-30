import { InjectRepository } from '@nestjs/typeorm';
import { SeatModel } from '../models/seat.model';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeatRepository {
	constructor(@InjectRepository(SeatModel) private repo: Repository<SeatModel>) {}
}
