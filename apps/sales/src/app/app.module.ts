import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule.forRoot({ envFilePath: '/envs/.sales.env', isGlobal: true })]
})
export class AppModule {}
