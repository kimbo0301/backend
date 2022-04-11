import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from '../productsTag/entities/productTag.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,

    @InjectRepository(ProductTag)
    private readonly productTagRepository : Repository<ProductTag>
    ) {}

  async findAll() {
    return await this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory','productTags'],
    });
  }

  async findOne({ productId }) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory','productTags'],
    });
  }

  async create({ createProductInput }) {
    // // 1. 상품만 등록하는 경우
    // // 상품을 데이터베이스에 저장
    // const result = await this.productRepository.save({
    //   ...createProductInput,

    //   // 하나하나 직접 나열하기
    //   // name: createProductInput.name,
    //   // description: createProductInput.description,
    //   // price: createProductInput.price,
    //  productSaleslocation: createProductInput.productSaleslocation
    // });
    // console.log(result);

    //
    //
    // 2. 상품과 상품거래위치를 같이 등록하는 경우
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;

    const result = await this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });

    // productTags // ["#전자제품" , "#영등포" , "#컴퓨터"]
    // 들어오는 데이터 예상
    const result2 = [];
    //for문에서 await는 좋은 방법이 아님 반복마다 await를 계속 사용하기 때문
    // 얘네 둘을 동시에 처리하는 방법이 있음 forEach map 이 훨씬 좋음 
    // 각각 따로따로 동시에 실행 시킬 수 있음
    // 동시에 데이터를 주고 받기 때문에 통으로 한번은 기다려야함 (Promise.all)
      for(let i =0; i < productTags.length; i++){
        const tagname = productTags[i].replace("#","")
        
        // 이미 등록된 태그인지 확인
        const prevTag = await this.productTagRepository.findOne({name : tagname})
        
        // 기존에 태그가 존재한다면
        if(prevTag){
          result2.push(prevTag)

        // 기존에 태그가 없다면
        }else{
          const newTag = await this.productTagRepository.save({ name : tagname })
          result2.push(newTag)
        }
      }

    return await this.productRepository.save({
      ...product,
      // one to one 연결
      productSaleslocation: result, 
      
      // many to one 연결
      productCategory: { id: productCategoryId }, // 카테고리 추가(result 통째로 넣기 vs id만 넣기)
      
      // many to many 연결
      productTags: result2, //여러 개 연결 시킬 때 배열로
    });
  }

  async update({ productId, updateProductInput }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    const newProduct = {
      ...product,
      ...updateProductInput,

      // id: product.id,
      // name: product.name,
      // description: product.description,
      // price: product.price,
      // isSoldout: product.isSoldout,

      // description: updateProductInput.description
      // price: updateProductInput.price
    };

    return await this.productRepository.save(newProduct);
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }

  async delete({ productId }) {
    // // 1. 실제 삭제
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // // 2. 소프트 삭제(직접 구현) - isDeleted
    // this.productRepository.update({ id: productId }, { isDeleted: true });

    // // 3. 소프트 삭제(직접 구현) - deletedAt
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });

    // // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // this.productRepository.softRemove({ id: productId }); // id로만 삭제 가능

    // 5. 소프트 삭제(TypeORM 제공) - softDelete
    const result = await this.productRepository.softDelete({ id: productId }); // 다양한 조건으로 삭제 가능!!
    return result.affected ? true : false;
  }
}
