import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { LikeEntity } from '../entities/like.entity';

@EntityRepository(LikeEntity)
export class UserLikeRepository extends BaseRepository<LikeEntity> {}
