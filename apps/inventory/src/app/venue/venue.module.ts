import { Module } from '@nestjs/common';
import { SeatRepository } from './infrastructure/database/write/repositories/seat.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatModel } from './infrastructure/database/write/models/seat.model';
import { ZoneModel } from './infrastructure/database/write/models/zone.model';
import { VenueModel } from './infrastructure/database/write/models/venue.model';
import { VenueRepository } from './infrastructure/database/write/repositories/venue.repository';
import { VenueController } from './interface/rmq/venue.controller';
import { CreateVenueHandler } from './application/create-venue/create-venue.handler';

@Module({
	imports: [TypeOrmModule.forFeature([SeatModel, ZoneModel, VenueModel])],
	controllers: [VenueController],
	providers: [SeatRepository, VenueRepository, CreateVenueHandler],
	exports: [SeatRepository]
})
export class VenueModule {}
