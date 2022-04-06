import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';

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
        const result = await this.productRepository.save({
            ...createProductInput,
        });
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
        };

        return await this.productRepository.save(newProduct);
    }
}
