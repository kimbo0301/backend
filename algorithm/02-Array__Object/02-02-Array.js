//004. 배열의 기능 
//문제 설명 : 주어진 fruits 배열에서 마지막 요소를 꺼내 newFruits에 넣어주세요.

//입력 인자 : X

//주의사항 : - length를 이용해서 문제를 풀어야 합니다.
//         - push를 이용해서 문제를 풀어야 합니다.
//         - 마지막 요소를 꺼낼 때 length를 사용하는 이유는 무엇일까요.

newFruits.push(fruits[fruits.length-1])
//마지막 요소를 length를 사용하는 이유는
//배열의 크기가 크건 작건 length는 index보다 반드시
//1만큼 크기 때문에 어떤 상황에서든 마지막 요소를 가져올 수 있음