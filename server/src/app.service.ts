/**dependencies */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hurray! You made it.';
  }
}
