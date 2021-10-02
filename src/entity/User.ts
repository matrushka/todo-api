import { IsEmail } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  displayName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;
}
