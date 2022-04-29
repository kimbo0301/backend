import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  //   let appService: AppService;
  beforeEach(async () => {
    const appModule = await Test.createTestingModule({
      //module
      controllers: [AppController], // resolver
      providers: [AppService], //service
    }).compile();

    appController = appModule.get<AppController>(AppController); //모듈에서 컨트롤러를 불러옴
    // appService = new AppService(); //
  });

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함!!', () => {
      const result = appController.getHello();
      expect(result).toBe('Hello World!');
    });
  });
});
