import { Controller, Get } from '@nestjs/common';

@Controller('') // "app" => ""
export class AppController {
  @Get()
  Home() {
    return 'Welcome to my Movie API';
  }
}
