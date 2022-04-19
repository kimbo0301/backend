import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable({})
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly connection: Connection,
  ) {}
  async create({ impUid, amount, currentUser }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();

    // transaction 시작
    await queryRunner.startTransaction('SERIALIZABLE'); //Transaction 시작 쿼리문들은 다 queryRunner에 담으면
    // 롤백을 통해 실수를 막을 수 있음

    try {
      // 1. pointTransaction 테블에 거래기록 1줄 생성
      const pointTransaction = await this.pointTransactionRepository.create({
        impUid: impUid,
        amount: amount,
        user: currentUser,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });

      await queryRunner.manager.save(pointTransaction);

      // 2. user의 돈 찾아오기
      // const user = await this.userRepository.findOne({ id: currentUser.id });
      const user = await queryRunner.manager.findOne(
        User, // table
        { id: currentUser.id }, // 조건
        { lock: { mode: 'pessimistic_write' } }, // select * for update from User
        // 이걸 쓰려면 isolation 수준이 SERIALIZABLE 이어야함 (비관적락)
      );
      // 3. 유저의 돈 업데이트
      // await this.userRepository.update(
      //   { id: user.id }, // 조건에 해당하는 데이터의
      //   { point: user.point + amount }, // 업데이트 하고 싶은 내용
      // );
      const updatedUser = this.userRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser); // this.userRepository.save(updatedUser)

      // commit 성공 확정!!
      await queryRunner.commitTransaction();

      // 4. 최종결과 프론트엔드에 돌려주기
      return pointTransaction;
    } catch (error) {
      // rollback 되돌리기 !!
      await queryRunner.rollbackTransaction();
    } finally {
      // 연결 해재 성공하든 실패하든 실행됨 === finally
      await queryRunner.release();
    }
  }
}
