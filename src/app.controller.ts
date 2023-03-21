import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo')
  newEnpoint() {
    return 'Nuevo enpoint';
  }

  @Get('tasks')
  getTasks() {
    return this.appService.allTasks();
  }

  @Get('/ruta/')
  hello() {
    return 'con /path/';
  }
}
