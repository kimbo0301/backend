import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './createProduct.input';

// 여러 타입을 입력받는 input 을 만듬
@InputType() // gql에 인풋타입으로 만듬
//playground ! === 필수입력임
//update 는 선택 입력으로 바꿔줘야함
//복붙은 변경될 때 문제가 됨
//재사용을 해야함
//extends 상속 받음
//PartialType 안에 있는 놈들은 있어도 되고 없어도 되는 선택적으로 바뀜 ? 바뀜
export class UpdateProductInput extends PartialType(CreateProductInput) {}

//OmiType 뺄 애들을 뺌 OmiType(price) price만뺌
//PickType 원하는 애들을 골라옴 PickType(price) price만 가져옴
