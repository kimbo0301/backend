import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from '../productImage/entities/productImage.entity';
import { Ranking } from '../ranking/entities/ranking.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(ProductImage)
        private readonly productImageRepository: Repository<ProductImage>,

        @InjectRepository(Ranking)
        private readonly rankiIdRepository: Repository<Ranking>,
    ) {}
    async findAll() {
        const products = await this.productRepository.find({
            relations: ['productimage', 'rankingid'],
            withDeleted: true,
        });
        return products;
    }

    async findOne({ productId }) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
            withDeleted: true,
            relations: ['productimage', 'rankingid'],
        });
        return product;
    }

    async create({ createProductInput }) {
        const { rankId, productImage, ...product } = createProductInput;
        console.log(rankId);

        const result1 = await this.productImageRepository.save({
            ...productImage,
        });
        const result2 = await this.productRepository.save({
            ...product,
            productimage: result1,
            ranking: { id: rankId },
        });

        return result2;
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

    async delete({ productId }) {
        const result = await this.productRepository.softDelete({
            id: productId,
        }); // 다양한 조건으로 삭제 가능!!
        return result.affected ? true : false;
    }

    async restoreOne({ productId }) {
        const result = await this.productRepository.restore({ id: productId });
        return result.affected ? true : false;
    }
}
