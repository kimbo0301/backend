import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardModule } from './apis/boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryModule } from './apis/productsCategory/productCategory.module';
import { ProductModule } from './apis/products/product.module';
import { UserModule } from './apis/users/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module';
import { FileModule } from './apis/file/file.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
@Module({
  imports: [
    AuthModule,
    BoardModule,
    FileModule,
    PointTransactionModule,
    ProductModule,
    ProductCategoryModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }), //이렇게 해야 리졸버에 컨텍스트에 접근이 가능해짐
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my-database', // my-database // localhost
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mydocker02', // mydocker02 // myproject02
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),

    CacheModule.register<RedisClientOptions>({
      store: redisStore, // 이라이브러리를 통해 저장
      url: 'redis://my-redis:6379', //redis의 주소 ip 필요 없음 네임리졸루션 도커
      isGlobal: true, // 모든 api에서 사용 가능하게끔 만들어줌
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
