import { FindOptionsRelations } from 'typeorm';
import { VenueModel } from '../models/venue.model';

export const VENUE_AGGREGATE_RELATION: FindOptionsRelations<VenueModel> = {
	zones: {
		seats: true
	}
};
