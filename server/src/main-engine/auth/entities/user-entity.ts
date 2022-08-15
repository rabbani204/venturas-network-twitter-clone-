import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  otpCode: string;

  @Column({
    type: 'timestamp',
    comment: 'verification otp expire time',
    nullable: true,
  })
  otpExpiresAt: Date;

  @Column({
    type: 'timestamp',
    comment: 'verification otp expire time',
    nullable: true,
  })
  passResetTokenExpireAt: Date;

  @Column({ type: 'varchar', length: 250, nullable: true })
  passResetToken: string;

  @Column({
    type: 'timestamp',
    comment: 'verification otp expire time',
    nullable: true,
  })
  passResetExpireAt: Date;

  @Column({
    type: 'varchar',
    length: 100,
    default: 'America/Los_Angeles',
    nullable: true,
  })
  timeZone: string;
}
