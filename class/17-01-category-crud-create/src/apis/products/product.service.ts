import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>, //db에 연결할 수 있는 레파지토리 타입
  ) {}

  async findAll() {
    return await this.productRepository.find();
    //db에 있는거 다가져옴
  }

  async findOne({ productId }) {
    return await this.productRepository.findOne({ id: productId });
  }

  async create({ createProductInput }) {
    // 카테고리를 데이터베이스에 저장           //키와 벨류가 같으면 생략가능
    const result = await this.productRepository.save({
      ...createProductInput,
      // name: createProductInput.name,
      // description: createProductInput.description,
      // price: createProductInput.price,
    });
    // id는 자동으로 생성되기 때문에 무시
    console.log(result);
    return result;
  }

  //상품수정
  async update({ productId, updateProductInput }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    const newProduct = {
      ...product,
      ...updateProductInput,
      // id: product.id,
      // name: product.name,

      // descriprion: product.description,
      // updateProductInput.description

      // price: product.price, updateProductInput.price 바꿀때 이놈들만 바꾸고싶음

      // 객체의 성질 똑같은 키로 들어오면 덮어쓰게됨 이 성질을 알고 있으면 간단히 바꿀 수 있음
      // 즉 product를 먼저 스프레드 시키고 , updateproductInput을 스프레드 시키면 덮어씌울 수 있음
    };

    return await this.productRepository.save(newProduct);
  }

  async checkSoldout({ productId }) {
    //일단 시도해봄 정상적으로 끝나면 catch무시 아래로 내려감
    // try에서 실패하면 즉시 중단하고 catch로 떨어져서 error message가 나옴
    // try {

    //   });
    //   // console.log('abc');
    //   // console.log('abc');
    // } catch (error) {
    //   throw error.message;
    // } finally {
    //   //try 에도 실행이 되어야하고 , catch에도 실행이되어야한다면
    //   //finally에 넣어줌
    //   //에러가 떨어져도 반드시 실행해야하는 특정로직
    // }
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    //위 아래 같은 내용
    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다');

    // if (product.isSoldout) {
    //   //예외처리 ()에는 message와 status코드가 들어갈 수 있음
    //   // nest에서 제공 HttpStatus
    //   throw new HttpException(
    //     '이미 판매가 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }
}
