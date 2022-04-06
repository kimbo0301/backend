import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './productCategory.entity';
import { ProductCategoryService } from './productCategory.service';
@Resolver()
export class ProductCategoryResolver {
  //데이터 주입 받기
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Mutation(() => ProductCategory)
  createProductCategory(
    @Args('name') name: string, //
    //name이란 이름으로 데이터 받기
    //받을 때 변수명과 타입 지정
  ) {
    //서비스에서 result를 받아옴
    //result를 프론트로 보내기위해 return
    return this.productCategoryService.create({ name }); // 받아온 name 넘기기 service로
  } //함수에서 주는 쪽이 args 받는 쪽이 파라미터
  //줄때는 객체로 배열은 엉킬 수 있음 받아올때
}
