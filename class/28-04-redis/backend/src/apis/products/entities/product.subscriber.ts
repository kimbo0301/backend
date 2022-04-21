import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from './product.entity';
import { BigQuery } from '@google-cloud/bigquery';
//Prodcut테이블을 구독 //
@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  // 내가 감시중이다 데이터 베이스와의 연결을 컨트롤
  constructor(connection: Connection) {
    connection.subscribers.push(this); // DB 에 연결 후 감시
    // this 현재 클래스를 의미
  }

  listenTo() {
    return Product; // Product테이블을 리스닝
  }

  // 뒤에 ? 가 붙으면 만들어도 되고 안만들어도 되고 implements는 안의 메서드를 내마음대로 재정의 하라는 뜻
  //프로덕트 테이블에 추가되면 실행
  afterInsert(event: InsertEvent<Product>) {
    console.log(event); // 최근에 입력한 값들의 정보들이 담겨있음 (테이블의 로그를 남긴다는 뜻)
    // 로그는 계속해서 쌓이기 때문에 관리가 힘들어짐 용량도 많이 듬
    // br과 b, db가 잇다면 br에서 b컴퓨터에 파일 형태로 남길 수 있음 하지만 이것도 문제임 b컴퓨터가 용량이 차면 여러 컴퓨터로 늘려야함
    // cloud provider에는 BigQuery가 있음 여기에 로그를 전부 집어넣으면 됨 관리 할 필요없고 , 속도도 빠름 대신 비용이듬
    // 즉 무작위로 발생하는 로그성 데이터는 BigQuery에다가 담아 놓으면 됨

    const bigQuery = new BigQuery({
      //storage를 만들 때와 같이
      keyFilename: 'gcp-bigquery.json',
      projectId: process.env.STORAGE_PROJECT_ID,
    });

    bigQuery
      .dataset('mybigquery02')
      .table('productlog')
      .insert([
        {
          id: event.entity.id, // 상품 아이디
          name: event.entity.name, // 상품 이름
          description: event.entity.description,
          price: event.entity.price,
          isSoldout: event.entity.isSoldout,
        },
        // 값이 여러개 들어올 수 있기 때문에 배열로 받아야함
        // 로그라는 것은 insertonly 그때그때의 기록을 남기는 것임
      ]);
  }
}
