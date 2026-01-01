import { Seat } from '../../../../domain/entities/seat.entity';
import { SeatCol } from '../../../../domain/value-objects/seat-col.vo';
import { SeatId } from '../../../../domain/value-objects/seat-id.vo';
import { SeatRow } from '../../../../domain/value-objects/seat-row.vo';
import { SeatModel } from '../models/seat.model';

export class SeatMapper {
	static toDomain(model: SeatModel): Seat {
		return Seat.restore({
			id: new SeatId(model.id),
			col: new SeatCol(model.col),
			row: new SeatRow(model.row),
			status: model.status,
			zoneId: model.zoneId,
			lockedUntil: model.lockedUntil
		});
	}

	static toPersistence(seat: Seat): SeatModel {
		const model = new SeatModel();
		const primitives = seat.toPrimitives();

		model.id = primitives.id;
		model.col = primitives.col;
		model.row = primitives.row;
		model.status = primitives.status;
		model.zoneId = primitives.zoneId;
		model.lockedUntil = primitives.lockedUntil;

		return model;
	}
}
