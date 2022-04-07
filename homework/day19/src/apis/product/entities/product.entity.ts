import {
    ManyToMany,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
    DeleteDateColumn,
} from 'typeorm';
import { Parchase } from 'src/apis/parchase/entities/parchase.entity';
import { Ranking } from 'src/apis/ranking/entities/ranking.entity';
import { ProductImage } from 'src/apis/productImage/entities/productImage.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    name: string;

    @Column({ default: 0 })
    @Field()
    rank: number;

    @Column()
    @Field(() => Int)
    price: number;

    @Column({ default: 0 })
    score: number;

    @ManyToMany(() => Parchase, (parchase) => parchase.product)
    @Field(() => [Parchase])
    parchase: Parchase[];

    @JoinColumn()
    @Field(() => ProductImage)
    @OneToOne(() => ProductImage)
    productimage: ProductImage;

    @Field(() => Ranking)
    @ManyToOne(() => Ranking)
    ranking: Ranking;

    @DeleteDateColumn()
    deletedAt?: Date;
}
