import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatModel } from './infrastructure/database/write/models/seat.model';
import { ZoneModel } from './infrastructure/database/write/models/zone.model';
import { VenueModel } from './infrastructure/database/write/models/venue.model';
import { VenueController } from './interface/rmq/venue.controller';
import { CreateVenueHandler } from './application/commands/create-venue/create-venue.handler';
import { TypeormVenueRepository } from './infrastructure/database/write/repositories/venue.repository';
import { VenueRepository } from './domain/repositories/venue.repository';

@Module({
	imports: [TypeOrmModule.forFeature([SeatModel, ZoneModel, VenueModel])],
	controllers: [VenueController],
	providers: [CreateVenueHandler, { provide: VenueRepository, useClass: TypeormVenueRepository }]
})
export class VenueModule {}
