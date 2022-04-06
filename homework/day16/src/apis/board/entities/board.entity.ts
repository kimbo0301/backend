import { Category } from 'src/apis/category/entities/product.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { ManyToOne, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    date: Date;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Category)
    category: Category;
}
