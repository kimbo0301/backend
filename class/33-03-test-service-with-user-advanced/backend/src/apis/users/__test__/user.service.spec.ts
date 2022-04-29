import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

class MockUserRepository {
  mydb = [
    { email: 'a@a.com', password: '0000', name: '짱구', age: 8 }, //한줄의 로우
  ];

  findOne(email) {
    const users = this.mydb.filter((el) => el.email === email);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

// interface IProfile {
//   name: '철수';
//   age: 13;
// }
// // qqq는 IProfile에 키만 뽑혀서 들어감
// const qqq: keyof IProfile;
// const qqq: 'name' | 'age'; // 같은 내용

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
// 유저 레파지토리에 키만 뽑아서 가짜 레파지토리를 만들고, 파샬타입으로 있을 수도 있고, 없을 수도 있게 만듬

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockRepository<User>;
  beforeEach(async () => {
    const userModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User), // 레파지토리를 가져옴
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    userService = userModule.get<UserService>(UserService);
    userRepository = userModule.get<MockRepository<User>>(
      getRepositoryToken(User),
    );
  });

  describe('create', () => {
    //처음에는 많으면 2개 적으면 1개
    // 업데이트 할 때마다 디테일하게
    it('이미 존재하는 이메일 검증', async () => {
      const userRepositorySpyFindOne = jest.spyOn(userRepository, 'findOne'); //findone 실행 체크
      const userRepositorySpySave = jest.spyOn(userRepository, 'save'); //save 실행 체크
      const myData = {
        email: 'a@a.com',
        hashedPassword: '1234',
        name: '철수',
        age: 13,
      };
      try {
        await userService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
      expect(userRepositorySpyFindOne).toBeCalledTimes(1);
      expect(userRepositorySpySave).toBeCalledTimes(0);
    });

    it('회원 등록 잘됐는지 검증', async () => {
      const userRepositorySpyFindOne = jest.spyOn(userRepository, 'findOne'); //findone 실행 체크
      const userRepositorySpySave = jest.spyOn(userRepository, 'save'); //save 실행 체크
      const myData = {
        email: 'v]bbb@bbb.com',
        hashedPassword: '1234',
        name: '철수',
        age: 13,
      };

      const myResultData = {
        email: 'v]bbb@bbb.com',
        password: '1234',
        name: '철수',
        age: 13,
      };

      const result = await userService.create({ ...myData });
      expect(result).toStrictEqual(myResultData); // 객체나 배열확인할떄
      expect(userRepositorySpyFindOne).toBeCalledTimes(1);
      expect(userRepositorySpySave).toBeCalledTimes(0);
    });
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe('fineOne', () => {});
});
