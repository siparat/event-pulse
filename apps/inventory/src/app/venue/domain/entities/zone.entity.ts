import { randomUUID } from 'crypto';
import { Seat } from './seat.entity';
import { ZoneIdVO } from '../value-objects/zone-id.vo';

export interface ZoneProps {
	id: ZoneIdVO;
	venueId: string;
	name: string;
	totalRows: number;
	totalCols: number;
	seats?: Seat[];
}

export class ZoneEntity {
	private readonly id: ZoneIdVO;
	private venueId: string;
	private name: string;
	private totalRows: number;
	private totalCols: number;
	private seats?: Seat[];

	private constructor(props: ZoneProps) {
		this.id = props.id;
		this.venueId = props.venueId;
		this.name = props.name;
		this.totalCols = props.totalCols;
		this.totalRows = props.totalRows;
		this.seats = props.seats;
	}

	generateSeats(): Seat[] {
		const seats: Seat[] = [];

		for (let r = 1; r <= this.totalRows; r++) {
			for (let c = 1; c <= this.totalCols; c++) {
				seats.push(Seat.register(r, c, this.id.toString()));
			}
		}

		this.seats = seats;
		return seats;
	}

	static register(venueId: string, name: string, totalRows: number, totalCols: number): ZoneEntity {
		if (totalRows <= 0 || totalCols <= 0) {
			throw new Error('Размеры зоны должны быть положительными числами');
		}

		return new ZoneEntity({
			id: new ZoneIdVO(randomUUID()),
			venueId,
			name,
			totalRows,
			totalCols,
			seats: []
		});
	}

	static restore(props: ZoneProps): ZoneEntity {
		return new ZoneEntity(props);
	}

	toPrimitives() {
		return {
			id: this.id.toString(),
			venueId: this.venueId,
			name: this.name,
			totalRows: this.totalRows,
			totalCols: this.totalCols,
			seats: this.seats?.map((seat) => seat.toPrimitives()) || []
		};
	}
}
