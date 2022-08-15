import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { FollowEntity } from '../entities/follow.entity';

@EntityRepository(FollowEntity)
export class UserFollowRepository extends BaseRepository<FollowEntity> {}
