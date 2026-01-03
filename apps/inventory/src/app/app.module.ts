import { getRmqClientConfig, getTypeormConfig, RmqQueues } from '@event-pulse/infrastructure';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueModel } from './venue/infrastructure/database/write/models/venue.model';
import { ZoneModel } from './venue/infrastructure/database/write/models/zone.model';
import { SeatModel } from './venue/infrastructure/database/write/models/seat.model';
import { VenueModule } from './venue/venue.module';
import { join } from 'path';
import { CqrsModule } from '@nestjs/cqrs';
import { OutboxModel } from './outbox/infrastructure/database/write/models/outbox.model';
import { OutboxModule } from './outbox/outbox.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule } from '@nestjs/microservices';

@Module({
	imports: [
		OutboxModule,
		VenueModule,
		ScheduleModule.forRoot(),
		CqrsModule.forRoot(),
		ConfigModule.forRoot({ envFilePath: 'envs/.inventory.env', isGlobal: true }),
		TypeOrmModule.forRootAsync(
			getTypeormConfig(
				[VenueModel, ZoneModel, SeatModel, OutboxModel],
				[join(__dirname, '..', 'database', 'migrations/*{.ts,.js}')]
			)
		),
		ClientsModule.registerAsync(getRmqClientConfig(RmqQueues.INVENTORY))
	]
})
export class AppModule {}
