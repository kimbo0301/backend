// 시저 암호

// 문제 설명
// 어떤 문장의 각 알파벳을 일정한 거리만큼 밀어서 다른 알파벳으로 바꾸는 암호화 방식을 시저 암호라고 합니다. 예를 들어 "AB"는 1만큼 밀면 "BC"가 되고, 3만큼 밀면 "DE"가 됩니다. "z"는 1만큼 밀면 "a"가 됩니다. 문자열 s와 거리 n을 입력받아 s를 n만큼 민 암호문을 만드는 함수, solution을 완성해 보세요.

// 제한 조건
// 공백은 아무리 밀어도 공백입니다.
// s는 알파벳 소문자, 대문자, 공백으로만 이루어져 있습니다.
// s의 길이는 8000이하입니다.
// n은 1 이상, 25이하인 자연수입니다.

function solution(s, n) {
  return s
    .split("")
    .map((e) => {
      // s문자열을 '' 배열로 자르고 map으로 푼다
      // AB를 입력 받았다면 [A,B]
      if (e === " ") return e;
      //만약 엘리먼트의 요소가 ' ' 과 같다면 그대로 e를 리턴
      let ascii = e.charCodeAt();
      //e가 공백이 아니라면
      //ascii라는 변수에 엘리먼트의 아스키코드 A === 65 를 넣음

      let upper = ascii <= 90;
      // upper 이라는 변수에 ascii 가 90보다 작다면 upper에 넣음
      //(조건문이 들어갈수 있음) 소괄호안에
      ascii += n;
      // ascii += n
      if (!upper && ascii > 122) ascii = ascii - 122 + 96;
      // 만약 upper가 아니고 ascii가 122보다 크다면 ascii = ascii -122 + 96
      // 뜻은 122라면 소문자 a - 96을 하면 대문자 A가 됨 즉 122보다 클시 대문자로 바꿈
      else if (upper && ascii > 90) ascii = ascii - 90 + 64;

      return String.fromCharCode(ascii);
    })
    .join("");
}

// 입출력 예
// s	n	result
// "AB"	1	"BC"
// "z"	1	"a"
// "a B z"	4	"e F d"
