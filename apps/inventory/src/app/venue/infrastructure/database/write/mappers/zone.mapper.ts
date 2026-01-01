import { Zone } from '../../../../domain/entities/zone.entity';
import { ZoneId } from '../../../../domain/value-objects/zone-id.vo';
import { ZoneModel } from '../models/zone.model';
import { SeatMapper } from './seat.mapper';

export class ZoneMapper {
	static toDomain(model: ZoneModel): Zone {
		return Zone.restore({
			id: new ZoneId(model.id),
			name: model.name,
			totalCols: model.totalCols,
			totalRows: model.totalRows,
			venueId: model.venueId,
			seats: model.seats.map(SeatMapper.toDomain)
		});
	}

	static toPersistence(zone: Zone): ZoneModel {
		const model = new ZoneModel();
		const primitives = zone.toPrimitives();

		model.id = primitives.id;
		model.name = primitives.name;
		model.totalCols = primitives.totalCols;
		model.totalRows = primitives.totalRows;
		model.venueId = primitives.venueId;
		model.seats = zone.getSeats().map(SeatMapper.toPersistence);

		return model;
	}
}
