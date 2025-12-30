import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: '../../envs/.inventory.env' });

export const VenueDataSource = new DataSource({
	type: 'postgres',
	url: process.env.WRITE_DB_URL,
	entities: [join(__dirname, '../**', '*.model{.ts,.js}')],
	migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
	synchronize: false
});
