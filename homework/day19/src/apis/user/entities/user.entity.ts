import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Parchase } from 'src/apis/parchase/entities/parchase.entity';
import { Board } from 'src/apis/board/entities/board.entity';
import { Field, ObjectType } from '@nestjs/graphql';
@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('uuid')
    //id가 자동으로 붙음
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    email: string;

    @Column()
    @Field(() => User)
    password: string;

    @ManyToOne(() => Parchase)
    @Field(() => Parchase)
    parchase: Parchase;

    @ManyToOne(() => Board)
    @Field(() => Board)
    board: Board;
}
