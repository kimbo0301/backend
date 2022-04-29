import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 가짜 앱서비스를 만듬 이유는 원본은 DB에 연결하는 코드들이 있기 때문
class MockAppService {
  getHello() {
    //Api이름은 바뀌면 안되지만 내용은 바뀌어도 됨
    // 자바스크립트로 임시 배열을 만들어 디비처럼 꾸며놓고 거기에 저장이 되는지 안되는지 테스팅
    return 'Hello World';
  }
}
describe('AppController', () => {
  let appController: AppController;
  beforeEach(async () => {
    const appModule = await Test.createTestingModule({
      //module
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useClass: MockAppService,
          // 앱서비스에 들어갈 위치에 앱서비스를 주입하지말고, 목앱서비스를 주입해
        },
      ], // 원본이 상하지 않게
    }).compile();

    appController = appModule.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함!!', () => {
      const result = appController.getHello();
      expect(result).toBe('Hello World!');
    });
  });
});
