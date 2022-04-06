import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateProductInput } from '../product/dto/createProduct.input';
import { Product } from '../product/entities/product.entity';
import { UpdateProductInput } from './dto/updateProduct.input';
import { ProductService } from './product.service';
@Resolver()
export class ProductResolver {
    //데이터 주입 받기
    constructor(private readonly productService: ProductService) {}

    @Query(() => [Product])
    fetchProducts() {
        return this.productService.findAll();
    }

    @Query(() => Product)
    fetchProduct(@Args('productId') productId: string) {
        return this.productService.findOne({ productId });
    }

    @Mutation(() => Product)
    createProduct(
        @Args('createProductInput') createProductInput: CreateProductInput,
    ) {
        return this.productService.create({ createProductInput }); // 받아온 name 넘기기 service로
    }

    @Mutation(() => Product)
    async updateProduct(
        @Args('productId') productId: string,

        @Args('updateProductInput') updateProductInput: UpdateProductInput,
    ) {
        // 수정하기
        return await this.productService.update({
            productId,
            updateProductInput,
        });
    }
}
