import { IsEnum, IsOptional, IsNotEmpty } from "class-validator";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { TaskStatus } from "../types";

export type TaskProps = {
  status?: TaskStatus;
  name: string;
};

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({
    type: "enum",
    enum: TaskStatus,
    default: TaskStatus.TO_DO,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
