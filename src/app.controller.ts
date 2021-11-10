import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//ha itt nincs paramétere a @Controller-nek, akkor a default ( / )-ra fog vonatkozni. Pl. localhost:3000/. Tehát a root-ra vonatkozik. 
//ha pl el akadjuk érni a localhost/product-ot, akkor @Controller('product') -ot kell implementálni
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
