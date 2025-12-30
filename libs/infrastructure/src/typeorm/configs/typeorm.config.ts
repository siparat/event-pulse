import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeormConfig = (
	entities: TypeOrmModuleOptions['entities'],
	migrations: string[]
): TypeOrmModuleAsyncOptions => ({
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: (config: ConfigService) => ({
		type: 'postgres',
		url: config.get('WRITE_DB_URL'),
		entities,
		migrations
	})
});
