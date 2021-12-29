import { Injectable } from '@nestjs/common';

import { from } from 'rxjs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
