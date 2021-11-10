import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/pruducts.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ProductsModule, MongooseModule.forRoot("mongodb+srv://")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
