import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('follows')
export class FollowEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({ type: 'bigint' })
  userId: number;

  @Column({ type: 'bigint' })
  followerId: number;
}
