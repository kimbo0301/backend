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
export class Parchase {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    price: number;

    @Column()
    count: number;

    @Column()
    soldeAt: Date;

    @ManyToOne(() => User)
    user: User;

    @ManyToMany(() => Product, (product) => product.parchase)
    product: Product[];
}
