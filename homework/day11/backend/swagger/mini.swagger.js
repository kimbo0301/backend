/**
 * @swagger
 * /users:
 *  get:
 *     summary: 유저 목록 보기
 *     tags: [Users]
 *     requestBody:
 *              required:true
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             name:
 *                                 type: string
 *                                 required: true
 *                                 example: 김보인
 *                             email:
 *                                 type: string
 *                                 required: true
 *                                 example: abcde@gmail.com
 *                             personal:
 *                                 type: string
 *                                 required: true
 *                                 example: 123456-*******
 *                             prefer:
 *                                 type: string
 *                                 required: true
 *                                 example: https://www.aaa.com
 *                             pwd:
 *                                 type: string
 *                                 required: true
 *                                 example: 1234
 *                             phone:
 *                                 type: string
 *                                 required: true
 *                                 example: 01012341234
 *                             og: 
 *                                 type: object
 *                                 required: true
 *                                 example: 01012341234
 *     responses:
 *         '200':
 *                description: user 목록 리턴
 *                content:
 *                     application/json:
 *                        schema:
 *                          type: string
 *                          example: sddjfjsd
 */


















/**
 * @swagger
 * /tokens/phone:
 *     post:
 *       parameter:
 *         - in: path
 *       tags:
 *         - phone
 *       summary: 토큰 생성
 *       description: Send the Phone number to get Token
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 phone: "01012345678"
 *       responses:
 *         "200":
 *           description: Successful response
 *           content:
 *             application/json:
 *              schema:
 *                type: string
 *                example:
 *                  인증번호 전송
 *     patch:
 *       tags:
 *         - phone
 *       summary: 인증완료
 *       description: Complete the Auth
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 phone: "01012341234"
 *                 token: "123456"
 *       responses:
 *         "200":
 *           description: Successful response
 *           content:
 *             application/json:
 *              schema:
 *                type: boolean
 *                example:
 *                  true
 * /user:
 *     post:
 *       tags:
 *         - user
 *       summary: 가입
 *       description: Register New User
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                user:
 *                 name: aaa
 *                 email: aaa@gmail.com
 *                 personal: 123456-1234567
 *                 prefer: http://www.aaa.com/
 *                 pwd: "1234"
 *                 phone: "01012345678"
 *       responses:
 *         "200":
 *           description: Successful response
 *           content:
 *             application/json:
 *              schema:
 *               type: string
 *               example:
 *                 624049d34ccad6d254e0f479
 * /users:
 *     get:
 *       tags:
 *         - users
 *       summary: 유저 리스트
 *       description: Get users list
 *       responses:
 *         "200":
 *           description: Successful response
 *           content:
 *             application/json:
 *              schema:
 *               type: object
 *               example:
 *                 {
 *                      "_id": "62404a87b01a668e48ab1395",
 *                      "name": "aaa",
 *                      "email": "aaa@gmail.com",
 *                      "personal": "123456-*******",
 *                      "prefer": "http://www.naver.com/",
 *                      "pwd": "1234",
 *                      "phone": "01012345678",
 *                      "og": {
 *                          "title": "네이버",
 *                          "url": "https://www.naver.com/",
 *                          "image": "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png",
 *                          "description": "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요"
 *                            },
 *                      "__v": 0
 *                  }
 * /starbucks:
 *     get:
 *       tags:
 *         - starbucks
 *       summary: 커피 리스트
 *       description: Get coffee list
 *       responses:
 *         "200":
 *           description: Successful response
 *           content:
 *             application/json:
 *              schema:
 *               type: object
 *               example:
 *                      {
 *                           "_id": "623d899ec5653ef8f0a51fa2",
 *                           "name": "에스프레소",
 *                           "img": "https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[30]_20210415144252244.jpg",
 *                           "__v": 0
 *                       }
 *
 */
