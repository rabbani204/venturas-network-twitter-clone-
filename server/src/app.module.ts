/**dependencies */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';
/**controllers */
import { AppController } from './app.controller';
/**services */
import { AppService } from './app.service';
// import { AdminModule } from './modules/admin/admin.module';
/**validate env config */
import { validate } from './main-engine/config/env.validation';
import {
  TypeOrmConfigModule,
  TypeOrmConfigService,
} from './main-engine/config/typeorm-config';
/** logger middleware */
import { LoggerMiddleware } from './main-engine/middleware';
/**modules */
import { BullModule } from '@nestjs/bull';
import { QueueMailConsumer } from './modules/queue-mail/queue-mail.consumer';
import { UniEngineModule } from './main-engine/uni-engine.module';
import { UniEngineService } from './main-engine/uni-engine.service';
import { AuthModule } from './main-engine/auth/auth.module';
import { FollowController } from './modules/follow/follow.controller';
import { FollowService } from './modules/follow/follow.service';
import { UserFollowRepository } from './modules/follow/repositories/follow.repositoty';
import { UserPostRepository } from './modules/post/repositories';
import { PostController } from './modules/post/post.controller';
import { PostService } from './modules/post/postService';
import { UserLikeRepository } from './modules/post/repositories/like.repository';
import { UserRepository } from './main-engine/auth/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserFollowRepository,
      UserPostRepository,
      UserLikeRepository,
      UserRepository,
    ]),
    AuthModule,
    /**initialize nest js config module */
    ConfigModule.forRoot({
      validate: validate,
      //responsible for use config values globally
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),

    // BullModule.registerQueue({
    //   name: 'lead-mail',
    // }),
    //type orm dependencies integration
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      inject: [ConfigService],
      // Use useFactory, useClass, or useExisting
      // to configure the ConnectionOptions.
      name: TypeOrmConfigService.connectionName,
      useExisting: TypeOrmConfigService,
      // connectionFactory receives the configured ConnectionOptions
      // and returns a Promise<Connection>.
      connectionFactory: async (options) => {
        const connection = await createConnection(options);
        return connection;
      },
    }),

    //module prefix for modules
    RouterModule.register([
      //module prefix for admin
      {
        path: 'admin',
        // module: AdminModule,
      },
    ]),
    UniEngineModule,
  ],
  controllers: [AppController, FollowController, PostController],
  providers: [
    AppService,
    UniEngineService,
    QueueMailConsumer,
    FollowService,
    PostService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
