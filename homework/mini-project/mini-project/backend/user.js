import {getToday} from './utils.js'
import axios from 'axios'
export function checkValidationEmail(email){
    if(email === undefined || !email.includes("@")){
        console.log("에러발생!! 이메일을 제대로 입력해 주세요!!!!")
        return false
    } else {
        return true
    }
}

export function getWelcomeTemplate({name}){
    return `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!!!</h1>
                <hr />
                <div>이름: ${name}</div>

                <div>가입일: ${getToday()}</div>
            </body>
        </html>
    `
}

export async function sendTemplateToEmail(email, mytemplate){
    const appKey = process.env.EMAIL_APP_KEY
    const XSecretKey = process.env.EMAIL_X_SECRET_KEY
    const sender = process.env.EMAIL_SENDER
   
    // 메일을 보낼 때 css문법은 옛날 문법으로 해야 웬만한 사이트에서 css가 적용됨
   const result = await axios.post(

       `https://api-mail.cloud.toast.com/email/v2.0/appKeys/${appKey}/sender/mail`,
       {
            senderAddress: sender,
            body:mytemplate,
            receiverList:[{receiveMailAddr:email,receiveType:"MRT0"}]
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
   console.log("가입 완료!!!")
   
    // console.log(email + "이메일로" + mytemplate + "를 전송합니다.")
}