import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule.forRoot({ envFilePath: '/envs/.access.env', isGlobal: true })]
})
export class AppModule {}
