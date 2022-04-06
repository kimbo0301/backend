import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ranking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    subject: string;
}
