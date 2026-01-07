import { Venue } from '../venue.aggregate';

export abstract class VenueRepository {
	abstract save(venue: Venue): Promise<void>;
	abstract findById(id: string): Promise<Venue | null>;
	abstract findByAddress(address: string): Promise<Venue | null>;
	abstract existsByAddress(address: string): Promise<boolean>;
}
