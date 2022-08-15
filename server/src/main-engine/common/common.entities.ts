import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { StatusField } from './enum';
import { UserTypesEnum } from './enum/user-types.enum';

export abstract class CommonEntity {
  @CreateDateColumn({ select: false })
  createdAt: Timestamp;

  @UpdateDateColumn({ nullable: true, select: false })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, select: false })
  deletedAt?: Timestamp;

  @Column({
    type: 'enum',
    enum: UserTypesEnum,
    default: UserTypesEnum.ADMIN,
    select: false,
  })
  createdType: string;

  @Column({
    type: 'enum',
    enum: UserTypesEnum,
    nullable: true,
    select: false,
  })
  updatedType: string;

  @Column({ type: 'int', nullable: true, select: false })
  createdBy: number;

  @Column({ type: 'int', nullable: true, select: false })
  updatedBy: number;

  @Column({ type: 'int', nullable: true, select: false })
  deletedBy: number;

  @Column({
    type: 'enum',
    enum: StatusField,
    default: StatusField.ACTIVE,
  })
  status: string;
}
