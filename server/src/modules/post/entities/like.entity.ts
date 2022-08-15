import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('likes')
export class LikeEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({ type: 'bigint' })
  userId: number;

  @Column({ type: 'text' })
  postId: string;
}
