// 1개 테스트
it('더하기 테스트', () => {
  //테스트할 이름, 테스트할 함수
  const a = 1;
  const b = 2;

  expect(a + b).toBe(3); // a + b 를 했을 때 3이 나오길 기대
});

// 여러개 묶음으로 테스트
describe('나의 테스트 그룹', () => {
  // 묶을 때는 describe

  it('더하기 테스트', () => {
    const a = 1;
    const b = 2;

    expect(a + b).toBe(3);
  });

  it('곱하기 테스트', () => {
    const a = 1;
    const b = 2;

    expect(a * b).toBe(2);
  });
});

// 상품 구매하기 테스트 예제
describe('상품 구매 테스트', () => {
  beforeEach(() => {
    //로그인 로직 작성..
    // 이 로직을 먼저 실행하고 밑에 있는 것들을 따로따로 실행
  });

  it('돈 검증하기', () => {
    // 돈 검증하는 로직...
    const result = true; // 돈이 충분하다고 가정
    expect(result).toBe(true);
  });

  it('상품 구매하기', () => {
    // 구매 로직...
    const result = true;
    expect(result).toBe(true);
  });
});
