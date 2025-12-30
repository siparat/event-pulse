import { getTypeormConfig } from '@event-pulse/infrastructure';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueModel } from './venue/infrastructure/database/write/models/venue.model';
import { ZoneModel } from './venue/infrastructure/database/write/models/zone.model';
import { SeatModel } from './venue/infrastructure/database/write/models/seat.model';
import { VenueModule } from './venue/venue.module';
import { join } from 'path';

@Module({
	imports: [
		VenueModule,
		ConfigModule.forRoot({ envFilePath: 'envs/.inventory.env', isGlobal: true }),
		TypeOrmModule.forRootAsync(
			getTypeormConfig(
				[VenueModel, ZoneModel, SeatModel],
				[join(__dirname, '..', 'database', 'migrations/*{.ts,.js}')]
			)
		)
	]
})
export class AppModule {}
