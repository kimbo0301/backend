import { Injectable } from '@nestjs/common';
import { Starbucks } from './entities/starbucks.entity';
@Injectable()
export class StarbucksService {
    findAll(): Starbucks[] {
        // DB에 접속해서 데이터를 꺼내오는 로직

        return [
            {
                name: 'aaa',
                price: 1,
                serving: 2,
                fat: 3,
                protein: 4,
                natrium: 5,
                sugars: 6,
                caffeine: 7,
            },
        ];
    }

    create(args) {
        // DB에 접속해서 데이터를 등록하는 로직
        console.log(args);
        return '등록에 성공했습니다.';
    }
}
