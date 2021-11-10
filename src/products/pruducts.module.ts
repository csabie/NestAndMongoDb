import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from "./product.model";

@Module({
    //forFeature ez által inject-álható lesz a module, ahol csak akarjuk
    imports: [MongooseModule.forFeature([{name: "Product", schema: ProductSchema}])],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule {
    
}