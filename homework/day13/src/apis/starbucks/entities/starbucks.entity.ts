import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

//graphql에 클래스가 아니라 객체 타입이라고 알려주는 것
@ObjectType()
//클래스와 디비연결을 위해
@Entity()
export class Starbucks {
    @PrimaryGeneratedColumn('increment')
    @Field(() => String) // graphql에 Int형임
    name: string;

    @Field(() => Number) // graphql에 String형임
    @Column()
    price: number;

    @Field(() => Number)
    @Column()
    serving: number;

    @Field(() => Number)
    @Column()
    fat: number;

    @Field(() => Number)
    @Column()
    protein: number;

    @Field(() => Number)
    @Column()
    natrium: number;

    @Field(() => Number)
    @Column()
    sugars: number;

    @Field(() => Number)
    @Column()
    caffeine: number;
}
