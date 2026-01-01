import { VenueId } from '../../../../domain/value-objects/venue-id.vo';
import { VenueName } from '../../../../domain/value-objects/venue-name';
import { Venue } from '../../../../domain/venue.aggregate';
import { VenueModel } from '../models/venue.model';
import { ZoneMapper } from './zone.mapper';

export class VenueMapper {
	static toDomain(model: VenueModel): Venue {
		return Venue.restore({
			id: new VenueId(model.id),
			address: model.address,
			name: new VenueName(model.name),
			status: model.status,
			zones: model.zones.map(ZoneMapper.toDomain)
		});
	}

	static toPersistence(venue: Venue): VenueModel {
		const model = new VenueModel();
		const primitives = venue.toPrimitives();

		model.id = primitives.id;
		model.address = primitives.address;
		model.name = primitives.name;
		model.status = primitives.status;
		model.zones = venue.getZones().map(ZoneMapper.toPersistence);

		return model;
	}
}
