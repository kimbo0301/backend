import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/product/entities/product.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Parchase {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => Int)
    price: number;

    @Column()
    @Field(() => Int)
    count: number;

    @Column()
    @Field(() => Date)
    soldeAt: Date;

    @ManyToOne(() => User)
    @Field(() => User)
    user: User;

    @ManyToMany(() => Product, (product) => product.parchase)
    @Field(() => [Product])
    product: Product[];
}
