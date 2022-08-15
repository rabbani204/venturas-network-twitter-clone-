/**dependencies */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PublicRoute } from '../utils/decorator';
import { AuthService } from './auth.service';
import { AddNewUserDto } from './dtos';
import { LoginUserDto } from './dtos/login-user.dto';
/**services */
/**guards */
//swagger doc
@ApiTags('Engine|Auth')
@Controller({
  //path name
  path: 'auth',
  //route version
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @PublicRoute()
  @ApiOperation({
    description: 'This route is responsible for register',
    summary: 'user registration',
  })
  @ApiBody({
    type: AddNewUserDto,
    description:
      'How to register new frontend user with body?... here is the example given below!',
    examples: {
      a: {
        summary: 'default',
        value: {
          firstName: 'test',
          lastName: 'test',
          email: 'test22o@gmail.com',
          password: '123456',
        } as unknown as AddNewUserDto,
      },
    },
  })
  @Post('registration')
  async createFrontendUser(@Body() addNewUserDto: AddNewUserDto) {
    const data = await this.authService.registerUser(addNewUserDto);
    return { message: 'successful', result: data };
  }

  @ApiOperation({
    description: 'Login User',
    summary: 'user authentication',
  })
  @ApiBody({
    type: LoginUserDto,
    description:
      'How to login in local with body?... here is the example given below!',
    examples: {
      a: {
        summary: 'default',
        value: {
          email: 'user@user.com',
          password: '123456',
        } as unknown as LoginUserDto,
      },
    },
  })
  @Post('login')
  async localLogin(@Body() loginUserDto: LoginUserDto) {
    const userData = await this.authService.login(loginUserDto);
    return { message: 'successful', result: userData };
  }

  @ApiOperation({
    description: 'User List',
    summary: 'Get user list',
  })
  @Get('get-user')
  async getUserList() {
    const userData = await this.authService.getUserList();
    return { message: 'successful', result: userData };
  }
}
