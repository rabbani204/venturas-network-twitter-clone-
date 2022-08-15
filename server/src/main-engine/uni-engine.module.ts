import { Module } from '@nestjs/common';
import { UniEngineController } from './uni-engine.controller';
import { UniEngineService } from './uni-engine.service';
import { AuthModule } from './auth/auth.module';
import { AppLoggerModule } from './logger/app-logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from './config/typeorm-config';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [UniEngineController],
  providers: [UniEngineService],
  imports: [
    AuthModule,
    TypeOrmConfigModule,
    AppLoggerModule,
    TypeOrmModule.forFeature([]),
    HttpModule,
  ],
})
export class UniEngineModule {}
