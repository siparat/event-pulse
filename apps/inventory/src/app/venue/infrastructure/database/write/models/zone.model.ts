import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryColumn,
	UpdateDateColumn
} from 'typeorm';
import { SeatModel } from './seat.model';
import { VenueModel } from './venue.model';

@Entity()
export class ZoneModel {
	@PrimaryColumn('uuid')
	id: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Index()
	@Column('uuid')
	venueId: string;

	@ManyToOne(() => VenueModel, (venue) => venue.zones, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'venueId' })
	venue: VenueModel;

	@Column()
	name: string;

	@Column('int')
	totalRows: number;

	@OneToMany(() => SeatModel, (seat) => seat.zone)
	seats: SeatModel[];

	@Column('int')
	totalCols: number;
}
