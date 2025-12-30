import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	UpdateDateColumn
} from 'typeorm';
import { ZoneModel } from './zone.model';
import { SeatStatus } from '@event-pulse/types';

@Index(['row', 'col', 'zoneId'], { unique: true })
@Entity()
export class SeatModel {
	@PrimaryColumn('uuid')
	id: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Index()
	@Column('uuid')
	zoneId: string;

	@ManyToOne(() => ZoneModel, (zone) => zone.seats, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'zoneId' })
	zone: ZoneModel;

	@Column('int')
	row: number;

	@Column('int')
	col: number;

	@Column({ type: 'enum', enum: SeatStatus, default: SeatStatus.AVAILABLE })
	status: SeatStatus;

	@Column({ type: 'timestamp', nullable: true })
	lockedUntil?: Date;
}
