import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    ClientsModule.register([
      // 서비스들을 GATEWAY에 등록 연결하는 과정
      {
        name: 'AUTH-SERVICE',
        transport: Transport.TCP, // 연결 방식
        options: { host: 'auth-service', port: 3001 },
      },
      {
        name: 'RESOURCE_SERVICE',
        transport: Transport.TCP,
        options: { host: 'resource-service', port: 3002 },
      },
    ]),
  ],
  controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
