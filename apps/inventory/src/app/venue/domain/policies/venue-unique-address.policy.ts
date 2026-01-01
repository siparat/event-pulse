export interface VenueUniquenessChecker {
	existsByAddress(address: string): Promise<boolean>;
}
