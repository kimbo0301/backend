import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// 결제 테이블은 수정이 있어서는 안되고, 삭제도 되면 안됨 등록만 할 수 있음
// 이유 추적 할 수 없기 때문
// 취소 할 때
// ex: imp_001 2000원 결제완료 7월13일
//     imp_001 2000원  취소   7월14일
// 나중에 찾을  때는 imp_001을 그룹핑해서 가장 최신 날짜의 내용들을 보면 현재 어떠 상태인지 볼 수 있음

export enum POINT_TRANSACTION_STATUS_ENUM {
  PAYMENT = 'PAYMENT', //
  CANCEL = 'CANCEL',
}

// enum 타입을 그래프큐엘에서 쓸 수 있게 등록
registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
  // 이름을 정해줘야함
  name: 'POINT_TRANSACTION_STATUS_ENUM',
});

// POINT_TRANSACTION_STATUS_ENUM.PAYMENT 다른데서 사용 할 경우

@Entity()
@ObjectType()
export class PointTransaction {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Field(() => String)
  @Column()
  impUid: string;

  @Field(() => Int)
  @Column()
  amount: number;

  // enum 타입이 들어가고 내가 정의한 것들만 들어갈 수 있음
  @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM })
  @Field(() => POINT_TRANSACTION_STATUS_ENUM)
  status: string;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}
