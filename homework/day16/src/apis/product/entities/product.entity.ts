import {
    ManyToMany,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Parchase } from 'src/apis/parchase/entities/parchase.entity';
import { Ranking } from 'src/apis/ranking/entities/ranking.entity';
import { ProductImage } from 'src/apis/productImage/entities/productImage.entity';
@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    rank: number;

    @Column()
    price: number;

    @Column()
    score: number;

    @ManyToMany(() => Parchase, (parchase) => parchase.product)
    parchase: Parchase[];

    @JoinColumn()
    @OneToOne(() => ProductImage)
    productimage: ProductImage;

    @ManyToOne(() => Ranking)
    ranking: Ranking;
}
