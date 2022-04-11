import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // auth resolver에서 이메일이 있는지 확인하기 위해
  // 서비스는 어디든 필요한 곳에서 사용할 수 있음
  async findOne(email) {
    return await this.userRepository.findOne({ email });
  }

  async create({ email, hashedPassword, name, age }) {
    const user = await this.userRepository.findOne({ email });
    // 중복 이메일인지 확인
    if (user) throw new ConflictException('이미 등록된 이메일 입니다.');

    return await this.userRepository.save({
      email,
      password: hashedPassword,
      name,
      age,
    });
  }
}
