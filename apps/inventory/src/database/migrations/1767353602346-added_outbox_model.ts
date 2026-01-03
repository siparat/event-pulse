import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedOutboxModel1767353602346 implements MigrationInterface {
	name = 'AddedOutboxModel1767353602346';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE "outbox_model" (
                "id" SERIAL NOT NULL,
                "type" character varying NOT NULL,
                "payload" jsonb NOT NULL,
                "occurredAt" TIMESTAMP NOT NULL,
                "published" boolean NOT NULL DEFAULT false,
                CONSTRAINT "PK_63a29736050b08f9b8a59f78ccf" PRIMARY KEY ("id")
            )
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            DROP TABLE "outbox_model"
        `);
	}
}
