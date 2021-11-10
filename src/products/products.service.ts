import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import {InjectModel} from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductsService{

    //mongoose module-injectálása
    constructor(@InjectModel('Product') private readonly productModel: Model<Product> ){}

    //ahhoz, hogy elérjük az adatokat a cload adatb-n be kell állítani a local ip-t
    //https://cloud.mongodb.com/v2/612f75ea0e7f732b41d7aba2#security/network/accessList
    //add ip address
    //ALLOW ACCESS FROM ANYWHERE
    async insertProduct(title: string, desc: string, price: number){
        const newProduct = new this.productModel({title, description: desc, price});
        
        const result = await newProduct.save();
        console.log(result.id);
        return result.id as string

    }

    async getPoducts(){

        const products = await this.productModel.find();
        
        return products
    }

    async getSingleProduct(productId: string){
        // const product = this.products.find(x => x.id===productId);
        // if(!product){
        //     throw new NotFoundException('Could not find product.');//automaikus 404 errort dob
        // }
        // return {...product};
        const product = await this.findProduct(productId); //itt egy tömböt ad vissza
        return product
    }

    async updateProduct(productId: string, title: string, desc: string, price: number){
        let updatedProduct = await this.findProduct(productId);

        if(title){
            updatedProduct.title = title;
        }
        if(desc){
            updatedProduct.description = desc;
        }
        if(price){
            updatedProduct.price = price;
        }
        updatedProduct.save()

    }

    async deleteProduct(prodId: string){
        const result = await this.productModel.deleteOne({_id: prodId});

        
        if(result.deletedCount === 0){
            throw new NotFoundException('Could not find product.');//automaikus 404 errort dob

        }
    }

    private async findProduct(id: string) : Promise<Product> {
        let product;

        try {
            product = await this.productModel.findById(id);
        } catch (err) {
            throw new NotFoundException('Could not find product.');//automaikus 404 errort dob
            
        }

        if(!product){
            throw new NotFoundException('Could not find product.');//automaikus 404 errort dob
        }

        return product;
    }

   
}