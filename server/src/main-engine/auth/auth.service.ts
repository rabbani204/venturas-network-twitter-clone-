import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './repositories';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}
  async registerUser(addNewUserDto) {
    const checkExist = await this.userRepository.find({
      where: {
        email: addNewUserDto.email,
      },
    });
    if (checkExist.length) {
      console.log('hello');

      return {
        error: 'true',
        message: 'This email already used.',
      };
    }
    // const emailOtp = Math.floor(1000 + Math.random() * 9000);
    addNewUserDto.password =
      addNewUserDto &&
      addNewUserDto.password &&
      addNewUserDto.password.length > 1
        ? bcrypt.hashSync(addNewUserDto.password, 10)
        : bcrypt.hashSync('123456', 10);
    let data = '';
    try {
      data = await this.userRepository.save(addNewUserDto);
    } catch (error) {
      console.log(error);
    }
    console.log(data, 'data');

    delete data['password'];
    return data;
  }

  //generate jwt access token
  async signJwtUser(user: any) {
    const data: any = {
      id: user.id,
      email: user.email,
    };
    const signJwt = this.jwtService.sign(data);
    return signJwt;
  }

  async login(loginData) {
    const user = await this.userRepository.findOne({
      where: {
        email: loginData.email,
      },
    });
    if (!user) {
      return {
        data: false,
        message: 'Please check email and password',
      };
    }
    const result = await bcrypt.compare(loginData.password, user.password);
    if (!result) {
      return {
        data: 'notResult',
        message: 'Please check email and password',
      };
    }
    delete user['password'];
    return {
      ...user,
      access_token: await this.signJwtUser(user),
    };
  }

  async getUserList() {
    try {
      const userList = await this.userRepository.find();
      return userList;
    } catch (error) {
      throw error;
    }
  }
}
