import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  // 사전에 검증 또는 작업할 것들 먼저 beforeEach
  let appController: AppController;
  let appService: AppService;
  beforeEach(() => {
    appService = new AppService(); //
    appController = new AppController(appService); // getHello함수를 실행하기 위해
  });

  describe('getHello', () => {
    //api 하나에 여러개의 검증이 필요하기 때문에 describe
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함!!', () => {
      const result = appController.getHello();
      expect(result).toBe('Hello World!');
    });

    // it('검증2...', () => {
    //
    // })
  });
});
