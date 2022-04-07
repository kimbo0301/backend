import { Field, InputType, Int } from '@nestjs/graphql';

// 여러 타입을 입력받는 input 을 만듬
@InputType() // gql에 인풋타입으로 만듬
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  price: number;
}
