import { Field, InputType } from '@nestjs/graphql';

@InputType() // InputType이라고 명시해줘야 docs에 나옴
export class CreateStarbucksInput {
    // docs에서 봤던 데이터를 담는 바구니
    @Field(() => String)
    name: string;

    @Field(() => Number)
    price: number;

    @Field(() => Number)
    serving: number;

    @Field(() => Number)
    fat: number;

    @Field(() => Number)
    protein: number;

    @Field(() => Number)
    natrium: number;

    @Field(() => Number)
    sugars: number;

    @Field(() => Number)
    caffeine: number;
}
