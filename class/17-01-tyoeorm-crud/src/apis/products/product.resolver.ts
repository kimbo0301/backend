import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateProductInput } from '../dto/createProduct.input';
import { UpdateProductInput } from '../dto/updateProduct.input';
import { Product } from './product.entity';
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
    @Args('name') name: string, //
    @Args('createProductInput') createProductInput: CreateProductInput, // input타입으로 받아옴
    //name이란 이름으로 데이터 받기
    //받을 때 변수명과 타입 지정
  ) {
    //서비스에서 result를 받아옴
    //result를 프론트로 보내기위해 return
    return this.productService.create({ createProductInput }); // 받아온 name 넘기기 service로
  } //함수에서 주는 쪽이 args 받는 쪽이 파라미터
  //줄때는 객체로 배열은 엉킬 수 있음 받아올때

  //수정 API
  @Mutation(() => Product) // 수정된 데이터를 보냄
  async updateProduct(
    //수정할 상품 id
    @Args('productId') productId: string,
    //id에 대해서 어떻게 상품을 수정할건지 내용을 줘야함
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 판매 완료가 되었는지 확인해보기
    await this.productService.checkSoldout({ productId });
    // 수정하기
    return await this.productService.update({ productId, updateProductInput });
  }
}
