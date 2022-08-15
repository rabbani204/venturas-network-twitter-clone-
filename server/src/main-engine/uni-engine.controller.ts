import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { lastValueFrom, map, Observable } from 'rxjs';
import { JwtAuthGuard } from './auth/guards';
import { UserPayloadInterface } from './auth/interfaces';
import { PublicRoute, RealIp, UserPayload } from './utils/decorator';

@ApiTags('Core')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
@Controller({
  //pathname
  path: 'core',
  //api version
  version: '1',
})
export class UniEngineController {
  constructor(
    // private readonly studentCounsellorAppointmentService: StudentCounsellorAppointmentService,
    private readonly httpService: HttpService,
  ) {}
}
