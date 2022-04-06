import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ProductSaleslocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  addressDetail: string;

  @Column()
  @Field(() => Float)
  lat: number;

  @Column()
  @Field(() => Float)
  lng: number;

  @Column()
  @Field(() => Date)
  meetingTime: Date;
}
