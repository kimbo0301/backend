// 2016년

// 문제 설명
// 2016년 1월 1일은 금요일입니다. 2016년 a월 b일은 무슨 요일일까요? 두 수 a ,b를 입력받아 2016년 a월 b일이 무슨 요일인지 리턴하는 함수, solution을 완성하세요. 요일의 이름은 일요일부터 토요일까지 각각 SUN,MON,TUE,WED,THU,FRI,SAT

// 입니다. 예를 들어 a=5, b=24라면 5월 24일은 화요일이므로 문자열 "TUE"를 반환하세요.

// 제한 조건
// 2016년은 윤년입니다.
// 2016년 a월 b일은 실제로 있는 날입니다. (13월 26일이나 2월 45일같은 날짜는 주어지지 않습니다)


function solution(a, b) {
    // 윤년은 2월이 29일까지 있고, 1년이 366일
    // 4, 100, 400으로 나누어지는 년도는 윤년
    const weekToDay = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    const leapYearMonths = [31,29,31,30,31,30,31,31,30,31,30,31]; 
    let day = b+4; // 1월 1일은 FRI, b가 1일 때 인덱스로는 5가 되어야함
    // 1월은 이전 월의 일수를 더하지 않음으로 a-1 조건으로 해야함
    for(let i = 0; i < a-1; ++i){
        day += leapYearMonths[i];
      //day b+4
      //
    }
    return weekToDay[day%7];
}


// 입출력 예
// a	b	result
// 5	24	"TUE"