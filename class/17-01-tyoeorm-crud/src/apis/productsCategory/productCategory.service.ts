import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './productCategory.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>, //db에 연결할 수 있는 레파지토리 타입
  ) {}

  async create({ name }) {
    // 카테고리를 데이터베이스에 저장           //키와 벨류가 같으면 생략가능
    const result = await this.productCategoryRepository.save({ name });
    // id는 자동으로 생성되기 때문에 무시
    console.log(result);
    return result;
  }
}
