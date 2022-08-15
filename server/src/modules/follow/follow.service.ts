import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPayloadInterface } from 'src/main-engine/auth/interfaces';
import { UserFollowRepository } from './repositories/follow.repositoty';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(UserFollowRepository)
    private readonly userFollowRepository: UserFollowRepository,
  ) {}

  async followUser(userPayload: UserPayloadInterface, id: number) {
    try {
      const isFollowing = await this.userFollowRepository.find({
        where: {
          userId: userPayload.id,
          followerId: id,
        },
      });
      console.log(isFollowing, '*');
      if (!isFollowing.length) {
        const data = await this.userFollowRepository.save({
          userId: userPayload.id,
          followerId: id,
        });
        console.log(data, 'data1');

        return data;
      }
      // else {
      //   const data = await this.userFollowRepository.delete({
      //     userId: userPayload.id,
      //     followerId: id,
      //   });
      //   console.log(data, 'data2');

      //   return data;
      // }
    } catch (e) {
      throw e;
    }
  }
}
