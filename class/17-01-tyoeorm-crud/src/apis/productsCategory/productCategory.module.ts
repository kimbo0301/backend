import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './productCategory.entity';
import { ProductCategoryResolver } from './productCategory.resolver';
import { ProductCategoryService } from './productCategory.service';

@Module({
  //여러개를 동시에 주입할 수 있음
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  providers: [
    // 의존성 주입을 해야함
    // resolver , services들에게
    ProductCategoryService,
    ProductCategoryResolver,
  ],
})
export class ProductCategoryModule {}
