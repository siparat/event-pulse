import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1767084956360 implements MigrationInterface {
	name = 'Init1767084956360';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TYPE "public"."seat_model_status_enum" AS ENUM('AVAILABLE', 'SOLD', 'RESERVED')
        `);
		await queryRunner.query(`
            CREATE TABLE "seat_model" (
                "id" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "zoneId" uuid NOT NULL,
                "row" integer NOT NULL,
                "col" integer NOT NULL,
                "status" "public"."seat_model_status_enum" NOT NULL DEFAULT 'AVAILABLE',
                "lockedUntil" TIMESTAMP,
                CONSTRAINT "PK_0ae223d75eb1b71f44425041cea" PRIMARY KEY ("id")
            )
        `);
		await queryRunner.query(`
            CREATE INDEX "IDX_62dd6dbb083b6c44b653d079f4" ON "seat_model" ("zoneId")
        `);
		await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_3245105aeb46b59f1578654ee9" ON "seat_model" ("row", "col", "zoneId")
        `);
		await queryRunner.query(`
            CREATE TYPE "public"."venue_model_status_enum" AS ENUM(
                'DRAFT',
                'OPENED',
                'IN_USED',
                'IN_MAINTENANCE',
                'ARCHIVED'
            )
        `);
		await queryRunner.query(`
            CREATE TABLE "venue_model" (
                "id" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "address" text NOT NULL,
                "status" "public"."venue_model_status_enum" NOT NULL DEFAULT 'DRAFT',
                CONSTRAINT "UQ_8244add4a294bdf28968bba4741" UNIQUE ("address"),
                CONSTRAINT "PK_239cb6991fe0f5b5936e2fff2de" PRIMARY KEY ("id")
            )
        `);
		await queryRunner.query(`
            CREATE TABLE "zone_model" (
                "id" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "venueId" uuid NOT NULL,
                "name" character varying NOT NULL,
                "totalRows" integer NOT NULL,
                "totalCols" integer NOT NULL,
                CONSTRAINT "PK_d778f75c777c2d85aacc52981c4" PRIMARY KEY ("id")
            )
        `);
		await queryRunner.query(`
            CREATE INDEX "IDX_29a0e368bbcef66aafe778b50a" ON "zone_model" ("venueId")
        `);
		await queryRunner.query(`
            ALTER TABLE "seat_model"
            ADD CONSTRAINT "FK_62dd6dbb083b6c44b653d079f46" FOREIGN KEY ("zoneId") REFERENCES "zone_model"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
		await queryRunner.query(`
            ALTER TABLE "zone_model"
            ADD CONSTRAINT "FK_29a0e368bbcef66aafe778b50ab" FOREIGN KEY ("venueId") REFERENCES "venue_model"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "zone_model" DROP CONSTRAINT "FK_29a0e368bbcef66aafe778b50ab"
        `);
		await queryRunner.query(`
            ALTER TABLE "seat_model" DROP CONSTRAINT "FK_62dd6dbb083b6c44b653d079f46"
        `);
		await queryRunner.query(`
            DROP INDEX "public"."IDX_29a0e368bbcef66aafe778b50a"
        `);
		await queryRunner.query(`
            DROP TABLE "zone_model"
        `);
		await queryRunner.query(`
            DROP TABLE "venue_model"
        `);
		await queryRunner.query(`
            DROP TYPE "public"."venue_model_status_enum"
        `);
		await queryRunner.query(`
            DROP INDEX "public"."IDX_3245105aeb46b59f1578654ee9"
        `);
		await queryRunner.query(`
            DROP INDEX "public"."IDX_62dd6dbb083b6c44b653d079f4"
        `);
		await queryRunner.query(`
            DROP TABLE "seat_model"
        `);
		await queryRunner.query(`
            DROP TYPE "public"."seat_model_status_enum"
        `);
	}
}
