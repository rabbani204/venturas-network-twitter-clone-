import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/main-engine/auth/guards';
import { UserPayloadInterface } from 'src/main-engine/auth/interfaces';
import { FilterDataDto } from 'src/main-engine/common/dtos';
import { UserPayload } from 'src/main-engine/utils/decorator';
import { AddPostDto } from './dtos';
import { PostService } from './postService';

//swagger doc
@ApiTags('Posts')
@ApiBearerAuth('jwt')
//guards
@UseGuards(JwtAuthGuard)
@Controller({
  //path name
  path: 'content',
  //route version
  version: '1',
})
export class PostController {
  constructor(private readonly postService: PostService) {}
  @ApiOperation({
    description: 'Create new post',
    summary: 'This api is responsible for create new post.',
  })
  @ApiBody({
    type: AddPostDto,
    description:
      'How to register new frontend user with body?... here is the example given below!',
    examples: {
      a: {
        summary: 'default',
        value: {
          title: 'This is title',
          content: 'This is lorem ipsum content.',
        } as unknown as AddPostDto,
      },
    },
  })
  @Post('')
  async createPost(
    @UserPayload() userPayload: UserPayloadInterface,
    @Body() addPostDto: AddPostDto,
  ) {
    const data = await this.postService.create(userPayload, addPostDto);
    return { message: 'successful', result: data };
  }

  @Get('delete/:postId')
  @ApiOperation({
    summary: 'Delete a post',
    description: 'This route is responsible for deleting a post.',
  })
  @ApiParam({
    name: 'postId',
    type: Number,
    description: 'Delete by Id',
    required: true,
  })
  async followUser(
    @Param('postId') postId: number,
    @UserPayload() userPayload: UserPayloadInterface,
  ) {
    const data = await this.postService.deletePost(userPayload, postId);
    return { message: 'successful', result: data };
  }

  @Get('like/:postId')
  @ApiOperation({
    summary: 'Delete a post',
    description: 'This route is responsible for deleting a post.',
  })
  @ApiParam({
    name: 'postId',
    type: Number,
    description: 'Delete by Id',
    required: true,
  })
  async likeOnPost(
    @Param('postId') postId: number,
    @UserPayload() userPayload: UserPayloadInterface,
  ) {
    const data = await this.postService.likePost(userPayload, postId);
    return { message: 'successful', result: data };
  }

  @Post('get-user-post')
  @ApiOperation({
    summary: 'Get post of user.',
    description: 'Get post of user',
  })
  @ApiBody({
    type: FilterDataDto,
    examples: {
      a: {
        summary: 'default',
        description: 'fetching all post of user.',
        value: {
          sortOrder: 'ASC || DESC',
          sortField: 'id',
          pageNumber: 1,
          pageSize: 10,
        } as unknown as FilterDataDto,
      },
    },
  })
  async getAllPostOfUser(
    @Body() filterDataDto: FilterDataDto,
    @UserPayload() userPayload: UserPayloadInterface,
  ) {
    const data = await this.postService.getAllPostOfUser(
      filterDataDto,
      userPayload,
    );

    return { message: 'Successful', result: data };
  }

  @Post('get-post-for-timeline')
  @ApiOperation({
    summary: 'Get post for timeline.',
    description: 'Get post for timeline',
  })
  @ApiBody({
    type: FilterDataDto,
    examples: {
      a: {
        summary: 'default',
        description: 'fetching all post of user.',
        value: {
          sortOrder: 'ASC || DESC',
          sortField: 'id',
          pageNumber: 1,
          pageSize: 10,
        } as unknown as FilterDataDto,
      },
    },
  })
  async getPostForTimeLine(
    @Body() filterDataDto: FilterDataDto,
    @UserPayload() userPayload: UserPayloadInterface,
  ) {
    const data = await this.postService.getPostForTimeLine(
      filterDataDto,
      userPayload,
    );

    return { message: 'Successful', result: data };
  }
}
