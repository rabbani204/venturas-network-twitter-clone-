import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { PostEntity } from '../entities/post.entity';

@EntityRepository(PostEntity)
export class UserPostRepository extends BaseRepository<PostEntity> {}
