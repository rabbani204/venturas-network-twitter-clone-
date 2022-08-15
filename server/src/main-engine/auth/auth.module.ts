/**dependencies */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
/**modules */
/**controllers */
import { AuthController } from './auth.controller';
/**services */
import { AuthService } from './auth.service';
/**Authentication strategies */
import { JwtStrategy, LocalStrategy } from './strategy';
import { QueueMailModule } from 'src/modules/queue-mail/queue-mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
    QueueMailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
