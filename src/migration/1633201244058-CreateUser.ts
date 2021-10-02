import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1633201244058 implements MigrationInterface {
  name = "CreateUser1633201244058";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "displayName" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "public"."user"`);
  }
}
