import axios from "axios"

export function checkValidationPhone(myphone){
    if(myphone.length !== 10 && myphone.length !== 11){
        console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!")
        return false
    } else {
        return true
    }
}

export function getToken(){
    const mycount = 6
    if(mycount === undefined){
        console.log("에러 발생!!! 갯수를 제대로 입력해 주세요!!!")
        return
    } else if(mycount <= 0){
        console.log("에러 발생!!! 갯수가 너무 적습니다!!!")
        return
    } else if(mycount > 10) {
        console.log("에러 발생!!! 갯수가 너무 많습니다!!!")
        return
    }
    const result = String(Math.floor(Math.random() * 10**mycount)).padStart(4, "0")
    return result
    // console.log(result)
}

export async function sendTokenToSMS(fff, ggg){
    //변수로 시크릿,앱,번호 뺴고 다른 파일로 옮긴 후에 깃허브에 올리면 안정적으로 관리 할 수 있음
    // 이것을 env파일이라고 함 .env(환경변수)
    //가지고 올때는 process.env.name === '철수'
    //env는 전부가 문자열 형태임 또 대문자만 쓸 수 있음 스네이크 케이스로 써야함
    //어차피 문자열 따옴표 필요없음
    //마지막으로 라이브러리 dotenv 가 있어야 읽을 수 있음 
    // const appKey = ""
    // const XSecretKey = ""
    // const sender = ``

    const appKey = process.env.SMS_APP_KEY
    const XSecretKey = process.env.SMS_X_SECRET_KEY
    const sender = process.env.SMS_SENDER


    //appKey 변수는 URL & Appkey - SMS에있음 시작주소도
    // 엔드포인트 작성 1인자 엔드포인트 2인자 데이터 3인자 헤더
    const result = await axios.post(`https://api-sms.cloud.toast.com/sms/v3.0/appKeys/${appKey}/sender/sms`,
    {
        body:`안녕하세요. 인증번호는 ${ggg}입니다.`,
        sendNo:sender,
        recipientList:[{internationalRecipientNo:fff}]
    },
    {
            headers:{
                // 가운데에 하이픈이 들어가기 때문에 문자열 형태로 감싸줘야함
                "Content-Type": "application/json;charset=UTF-8",
                "X-Secret-Key": XSecretKey
            }

        }
    )

    console.log(result)
    console.log("전송 끝!!!")
    // console.log(fff + "번호로 인증번호" + ggg + "를 전송합니다!!")
}
