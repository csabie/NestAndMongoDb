import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Product } from "./product.model";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController{
    constructor(private readonly productService: ProductsService){}

    @Post()
    // ez a @Body olyan mint a const {title, description, price} =req.body
    async addProduct(
        // így is lehet
        // @Body() completeBody: {title: string, description: string, price: string}
        @Body("title") prodTitle: string, 
        @Body("description") prodDesc: string, 
        @Body("price") prodPrice: number) {
        const generateId = await this.productService.insertProduct(prodTitle, prodDesc, prodPrice);
        
        return {id: generateId}
    }

    @Get()
    async getAllProducts(){
        return await this.productService.getPoducts() as Product[]
    }

    @Get(":id")
    getProduct(@Param("id") prodId: string) {
        return this.productService.getSingleProduct(prodId)
    }

    @Patch(":id")
    async updateProduct(
        @Param("id") prodId: string,
        @Body("title") prodTitle: string, 
        @Body("description") prodDesc: string, 
        @Body("price") prodPrice: number
        ) {
        await this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice )
        return null
    }

    @Delete(":id")
    async deleteProduct(@Param("id") prodId: string){
        await this.productService.deleteProduct(prodId);
        return null;
    }
}