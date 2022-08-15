import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/main-engine/auth/guards';
import { UserPayloadInterface } from 'src/main-engine/auth/interfaces';
import { UserPayload } from 'src/main-engine/utils/decorator';
import { FollowService } from './follow.service';

//swagger doc
@ApiTags('Follow')
@ApiBearerAuth('jwt')
//guards
@UseGuards(JwtAuthGuard)
@Controller({
  //path name
  path: 'follow',
  //route version
  version: '1',
})
export class FollowController {
  constructor(private readonly followService: FollowService) {}
  @Get('follow/:userId')
  @ApiOperation({
    summary: 'Follow a user.',
    description: 'This route is responsible for follow a user.',
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'follow user',
    required: true,
  })
  async followUser(
    @Param('userId') userId: number,
    @UserPayload() userPayload: UserPayloadInterface,
  ) {
    console.log(userId, 'id');

    const data = await this.followService.followUser(userPayload, userId);
    return { message: 'successful', result: data };
  }
}
