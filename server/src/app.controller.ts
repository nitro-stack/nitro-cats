import { Controller, Get } from '@nestjs/common';
import * as pkg from '../package.json';

@Controller()
export class AppController {
  @Get('')
  Default() {
    return `API version: ${pkg.version}`;
  }
}
