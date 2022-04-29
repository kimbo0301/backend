interface IProfile {
  name: string;
  age: 13;
  school: string;
  hobby?: string;
}

// interface IProfile {
//   apple: string;
// }

// interface는 선언병합이 가능 즉 2개의 똑같은 이름의 인터페이스는 합쳐짐

// const bbb: IProfile ={

// }

// 1. Partial 타입 특정 객체에 프로퍼티는 필수가 아니게 만들어줌
type Mytype1 = Partial<IProfile>;

// 2. Required 타입 특정 객체에 프로퍼티는 모두 필수가 됨
type Mytype2 = Required<IProfile>;

// 3. Pick 타입 특정 객체에 프로퍼티를 선택적으로 필수 , 선택으로 만들 수 있음
type Mytype3 = Pick<IProfile, "name" | "age">;

// 4. Omit 타입 특정 객체에 프로퍼티를 선택한 것 빼고 필수로 만듬
type Mytype4 = Omit<IProfile, "school">;

// 5. Record 타입 키를 ZZZ로 값을 IProfile타입으로 바꿈 name,age,school
type ZZZ = "aaa" | "qqq" | "rrr";
type Mytype6 = Record<ZZZ, IProfile>;
