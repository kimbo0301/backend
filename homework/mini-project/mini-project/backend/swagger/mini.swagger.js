/**
 * @swagger
 * /users:
 *      get:
 *         summary: 유저 목록보기
 *         tags: [User]
 *         requestBody:
 *                  required: true
 *                  content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                                  
 *         responses:
 *             200:
 *                 description: user 목록 리턴
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 name:
 *                                     type: string
 *                                     example: 홍길동
 *                                 email:
 *                                     type: string
 *                                     example: abc@gmail.com
 *                                 persnoal:
 *                                     type: string
 *                                     example: 123456-*******
 *                                 prefer:
 *                                     type: string
 *                                     example: https://www.abc.com
 *                                 pwd:
 *                                     type: string
 *                                     example: 1234
 *                                 phone:
 *                                     type: string
 *                                     example: "01012341234"
 *                                 og:
 *                                     type: object
 *                                     example: {
 *                                                  "title":"네이버",
 *                                                  "image":"https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png",
 *                                                  "description":"네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요"
 *                                               }
 */

/**
 * @swagger
 * /starbucks:
 *      get:
 *         summary: 커피 목록보기
 *         tags: [Starbucks]
 *         requestBody:
 *                  required: true
 *                  content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                                  
 *         responses:
 *             200:
 *                 description: user 목록 리턴
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 name:
 *                                     type: string
 *                                     example: 나이트로 바닐라 크림
 *                                 image:
 *                                     type: string
 *                                     example: "https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002487]_20210426091745467.jpg"
 */

/**
 * @swagger
 * /user:
 *      post:
 *         summary: 회원가입
 *         tags: [User]
 *         requestBody:
 *                  required: true
 *                  content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 user:
 *                                     type: object
 *                                     example: {
 *                                              "name" : "홍길동",
 *                                              "email": "abc@gmail.com",
 *                                              "personal": "123456-1234567",
 *                                              "prefer": "https://www.aaa.com",
 *                                              "pwd": "1234",
 *                                              "phone": "01012341234"
 *                                               }
 *                                  
 *         responses:
 *             200:
 *                 description: 회원가입 성공
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 name:
 *                                     type: string
 *                                     example: 홍길동
 *                                 email:
 *                                     type: string
 *                                     example: "abc@gmail.com"
 *                                 personal:
 *                                     type: string
 *                                     example: 123456-*******
 *                                 prefer:
 *                                     type: string
 *                                     example: "https://www.aaa.com"
 *                                 pwd:
 *                                     type: string
 *                                     example: 1234
 *                                 phone:
 *                                     type: string
 *                                     example: "01012341234"
 *                                
 */

/**
 * @swagger
 * /token:
 *      post:
 *         summary: 인증번호 전송
 *         tags: [Token]
 *         requestBody:
 *                  required: true
 *                  content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 phone:
 *                                     type: string
 *                                     exapmple: "01012341234"
 *                                  
 *         responses:
 *             200:
 *                 description: 인증번호를 전송했습니다.
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 phone:
 *                                     type: string
 *                                     example: "01012341234"
 *                                
 */

/**
 * @swagger
 * /token:
 *      patch:
 *         summary: 인증번호 확인
 *         tags: [Token]
 *         requestBody:
 *                  required: true
 *                  content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 phone:
 *                                     type: string
 *                                     exapmple: "01012341234"
 *                                 token:
 *                                     type: string
 *                                     exapmple: "123456"
 *                                  
 *         responses:
 *             200:
 *                 description: 인증이 완료되었습니다.
 */