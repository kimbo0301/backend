import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
    imports: [
        
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'c',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'mydocker02',
            entities: [__dirname + '/apis/**'],
            //시작 위치에 가서 apis로 가고 ** 폴더안의 폴더 모든 곳 샅샅이 뒤짐
            // entity포함된 파일 전부 뒤짐
            synchronize: true,
            logging: true,
            retryAttempts: 20,
        }),
    ],
    // controllers: [AppController],
    // providers: [AppService],
})
export class AppModule {}
