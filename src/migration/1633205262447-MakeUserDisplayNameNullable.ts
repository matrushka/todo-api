import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeUserDisplayNameNullable1633205262447 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "displayName" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "displayName" ADD NOT NULL`);
  }
}
