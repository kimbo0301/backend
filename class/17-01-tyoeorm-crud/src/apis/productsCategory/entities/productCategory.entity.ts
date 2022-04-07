import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType() //gql 스키마 만들기
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String) // gql 스키마 string 타입
  id: string;

  @Column({ unique: true }) //동일한 이름으로 들어오면 에러
  //디비에서 새거 지우면 에러 사라짐
  //nullable:true  === 빈 값이 들어와도 괜찮음
  @Field(() => String) // gql 스키마
  name: string;
}
