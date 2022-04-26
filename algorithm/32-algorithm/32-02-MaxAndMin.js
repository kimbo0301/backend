// - 최댓값과 최솟값

// ### **문제 설명**

// 문자열 s에는 공백으로 구분된 숫자들이 저장되어 있습니다. str에 나타나는 숫자 중 최소값과 최대값을 찾아 이를 "(최소값) (최대값)"형태의 문자열을 반환하는 함수, solution을 완성하세요.예를들어 s가 "1 2 3 4"라면 "1 4"를 리턴하고, "-1 -2 -3 -4"라면 "-4 -1"을 리턴하면 됩니다.

// ### 제한 조건

// - s에는 둘 이상의 정수가 공백으로 구분되어 있습니다.

function solution(s) {
  s += " ";
  let [min, max] = [0, 0];

  let str = "";

  for (let i = 0; i < s.length; i++) {
    if (s[i] === " ") {
      str = Number(str);
      if (min === 0 || max === 0) {
        // 기준점을 구하기 ( 가장 먼저 가져오는 숫자 )
        [min, max] = [str, str];
      } else {
        // 두번째부터 가져오는 숫자
        min = str < min ? str : min;
        max = str > max ? str : max;
      }
      console.log("min :" + min, "max :" + max);
      str = "";
      continue;
    }

    str += s[i];
  }

  return `${min} ${max}`;
}

// ### 입출력 예

// | s | return |
// | --- | --- |
// | "1 2 3 4" | "1 4" |
// | "-1 -2 -3 -4" | "-4 -1" |
// | "-1 -1" | "-1 -1" |
