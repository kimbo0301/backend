import express from  'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import {options} from './swagger/config.js'
import cors from 'cors'
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from './email.js'
const app = express();
app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.get('/users', (req,res) => {
    const guest = [
        { 
            email : "aaa@gmail.com", 
            name : "철수",
            phone : "01012345678",
            personal : "220110-2222222",
            prefer : "https://naver.com"
        },
        { 
            email : "bbb@gmail.com", 
            name : "영희",
            phone : "01022345678",
            personal : "330110-2222222",
            prefer : "https://naver2.com"
        },
        { 
            email : "ccc@gmail.com", 
            name : "훈이",
            phone : "01032345678",
            personal : "440110-2222222",
            prefer : "https://naver3.com"
        },
        { 
            email : "ddd@gmail.com", 
            name : "맹구",
            phone : "01042345678",
            personal : "550110-2222222",
            prefer : "https://naver5.com"
        },
        { 
            email : "eee@gmail.com", 
            name : "백구",
            phone : "01052345678",
            personal : "660110-2222222",
            prefer : "https://naver6.com"
        }
    ]
    
    res.send(guest)
})

app.get('/starbucks',(req,res) =>{
    const coffee = [
        { name: '아메리카노', kcal: 5 },{ name: '에스프레소', kcal: 3 },
        { name: '쿠키크런치백스치노', kcal: 125 },{ name: '카라멜마끼아또', kcal: 3 },
        { name: '퐁당치노', kcal: 25 },{ name: '바닐라라떼', kcal: 23 },
        { name: '몽땅쉐이크바닐라', kcal: 235 },{ name: '바닐라라떼', kcal: 53 },
        { name: '믹스커피', kcal: 65 },{ name: '핫초코',kcal: 5353 },
    ]

    res.send(coffee)
})

app.post('/phone',(req,res)=>{
    const myphone = req.body.phone
    // 1. 휴대폰번호 자릿수 맞는지 확인하기
    const isValid = checkValidationPhone(myphone)
    if(isValid){
        // 2. 핸드폰 토큰 6자리 만들기
        const mytoken = getToken()

        // 3. 핸드폰번호에 토큰 전송하기
        sendTokenToSMS(myphone, mytoken)
        res.send("인증완료")
    } 
})


app.post('/signup',(req,res)=>{
    const myuser = req.body.user
    // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
    const isValid = checkValidationEmail(myuser.email)
    if(isValid){
        // 2. 가입환영 템플릿 만들기
        const mytemplate = getWelcomeTemplate(myuser)
 
        // 3. 이메일에 가입환영 템플릿 전송하기
        sendTemplateToEmail(myuser.email, mytemplate)
    }   
})



app.listen(3000,()=> {
    console.log(`Example app listening on port ${3000}`)
})