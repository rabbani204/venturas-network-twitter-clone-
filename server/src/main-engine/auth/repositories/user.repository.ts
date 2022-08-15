import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { UsersEntity } from '../entities';

@EntityRepository(UsersEntity)
export class UserRepository extends BaseRepository<UsersEntity> {}
