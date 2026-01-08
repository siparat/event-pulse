import { VenueStatus } from '@event-pulse/types';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { ZoneModel } from './zone.model';

@Entity()
export class VenueModel {
	@PrimaryColumn('uuid')
	id: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column()
	name: string;

	@Column('text', { unique: true })
	address: string;

	@OneToMany(() => ZoneModel, (zone) => zone.venue)
	zones: ZoneModel[];

	@Column({ type: 'enum', enum: VenueStatus, default: VenueStatus.DRAFT })
	status: VenueStatus;
}
