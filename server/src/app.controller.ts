/**dependencies */
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
/**services */
import { AppService } from './app.service';

@ApiTags('Home')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
