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

    async findAll() {
        return await this.userRepository.find();
    }

    async findOne({ userId }) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        return user;
    }

    async create({ createUserInput }) {
        const { email, ...user } = createUserInput;

        const check = await this.userRepository.findOne({ email });
        if (check) throw new ConflictException('이미 등록된 이메일 입니다');
        return await this.userRepository.save({
            email,
            ...user,
        });
    }

    async delete({ userId }) {
        const result = await this.userRepository.softDelete({
            id: userId,
        }); // 다양한 조건으로 삭제 가능!!
        return result.affected ? true : false;
    }
    async update({ userId, updateUserInput }) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        const newUser = {
            ...user,
            ...updateUserInput,
        };

        return await this.userRepository.save(newUser);
    }
}
