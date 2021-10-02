import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTask1633209583538 implements MigrationInterface {
  name = "CreateTask1633209583538";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "task_status_enum" AS ENUM('TO_DO', 'IN_PROGRESS', 'COMPLETED')`
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "status" "task_status_enum" NOT NULL DEFAULT 'TO_DO', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TYPE "task_status_enum"`);
  }
}
