// 과제생성위치: homework/day02/template.js

// (자유롭게 파일을 더 추가하셔도 됩니다.)

// 1. 회원가입을 축하하는 형태의 템플릿을 출력하는 함수를 만들어 주세요.
//     1. **이메일**, **주민번호**, **휴대폰 번호**, **내가 좋아하는 사이트**를 함수의 입력으로 받고, 해당 내용이 html 태그로 감싸진 템플릿에 포함되어 콘솔에 출력되어야합니다.
//     2. 콘솔에 출력된 화면의 캡쳐본과 코드가 적힌 파일을 클래스룸에 제출해주세요.

function signup(guest){
    return `
        <html>
            **${guest.email}**
            **${guest.regestration}**
            **${guest.phone}**
            **${guest.site}**
        </html>
    `
}

const guest = {
    email : "abc@defg.com",
    regestration : "123456-1234567",
    phone : "010-1234-1234",
    site : "www.naver.com"
}

const result = signup(guest)
console.log(result)