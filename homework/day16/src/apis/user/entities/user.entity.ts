import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Parchase } from 'src/apis/parchase/entities/parchase.entity';
import { Board } from 'src/apis/board/entities/board.entity';
@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    //id가 자동으로 붙음
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => Parchase)
    parchase: Parchase;

    @ManyToOne(() => Board)
    board: Board;
}
