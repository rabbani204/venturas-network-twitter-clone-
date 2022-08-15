import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPayloadInterface } from 'src/main-engine/auth/interfaces';
import { UserRepository } from 'src/main-engine/auth/repositories';
import { FilterDataDto } from 'src/main-engine/common/dtos';
import { Pagination } from 'src/main-engine/common/interfaces';
import { FollowEntity } from '../follow/entities/follow.entity';
import { UserFollowRepository } from '../follow/repositories/follow.repositoty';
import { PostEntity } from './entities/post.entity';
import { UserPostRepository } from './repositories';
import { UserLikeRepository } from './repositories/like.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(UserPostRepository)
    private readonly userPostRepository: UserPostRepository,

    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,

    @InjectRepository(UserLikeRepository)
    private readonly userLikeRepository: UserLikeRepository,

    @InjectRepository(UserFollowRepository)
    private readonly userFollowRepository: UserFollowRepository,
  ) {}

  async create(userPayload: UserPayloadInterface, postData: any) {
    try {
      const submitObj = {
        title: postData.title,
        userId: userPayload.id,
        content: postData.content,
      };
      const data = await this.userPostRepository.save(submitObj);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(userPayload: UserPayloadInterface, postId) {
    try {
      const data = await this.userPostRepository.delete({
        userId: userPayload.id,
        id: postId,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async likePost(userPayload: UserPayloadInterface, postId) {
    try {
      const data = await this.userLikeRepository.save({
        userId: userPayload.id,
        postId: postId,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAllPostOfUser(
    data: FilterDataDto,
    userPayload: UserPayloadInterface,
  ): Promise<Pagination<PostEntity>> {
    const { pageSize, pageNumber } = data;

    const page = pageNumber ? (pageNumber == 1 ? 0 : pageNumber) : 1;
    const limit = pageSize ? pageSize : 10;
    const [post, total] = await this.userPostRepository
      .createQueryBuilder('post')
      .where(`post.userId = '${userPayload.id}'`)
      .orderBy(`post.${data.sortField}`, data.sortOrder)
      .withDeleted()
      .take(limit)
      .skip(page > 1 ? page * limit - limit : page)
      .getManyAndCount();

    const results: any = await Promise.all(
      post.map(async (e) => {
        const totalLike = await this.userLikeRepository
          .createQueryBuilder()
          .where(`postId = '${e.id}'`)
          .getCount();
        return {
          ...e,
          totalLike,
        };
      }),
    );

    return new Pagination<PostEntity>({
      results,
      limit,
      currentPage: page === 0 ? 1 : page,
      total,
    });
  }

  async getPostForTimeLine(
    data: FilterDataDto,
    userPayload: UserPayloadInterface,
  ): Promise<Pagination<PostEntity>> {
    const { pageSize, pageNumber } = data;
    const page = pageNumber ? (pageNumber == 1 ? 0 : pageNumber) : 1;
    const limit = pageSize ? pageSize : 10;
    console.log(userPayload, 'up');

    const followingData = await this.userFollowRepository
      .createQueryBuilder('follow')
      .where(`follow.userId = '${userPayload.id}'`)
      .select(['follow.followerId'])
      .getRawMany();
    const ids = [];
    console.log(followingData, '--------->');

    followingData.map((data) => {
      ids.push(data.follow_followerId);
    });
    const totalFollower = ids.length;
    console.log(ids, 'ids');

    const [post, total] = await this.userPostRepository
      .createQueryBuilder('post')
      .where('post.userId IN(:...ids)', {
        ids: ids,
      })
      .orderBy(`post.${data.sortField}`, data.sortOrder)
      .take(limit)
      .skip(page > 1 ? page * limit - limit : page)
      .getManyAndCount();
    console.log(post, 'post');
    const results: any = await Promise.all(
      post.map(async (e) => {
        const userInfo = await this.userRepository.findOne({
          where: {
            id: e.userId,
          },
        });
        const totalLike = await this.userLikeRepository
          .createQueryBuilder()
          .where(`postId = '${e.id}'`)
          .getCount();
        return {
          ...e,
          totalLike,
          userInfo,
          totalFollower,
        };
      }),
    );

    return new Pagination<PostEntity>({
      results,
      limit,
      currentPage: page === 0 ? 1 : page,
      total,
    });
  }
}
