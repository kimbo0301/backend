import  express, { response } from "express";
import mongoose from 'mongoose'
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from './user.js'
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'
import {Token} from './models/token.model.js'
import { User } from "./models/user.model.js";
import dotenv from 'dotenv'
import cors from 'cors'
import {ogAPI} from './cheerio.js'
import { Starbucks } from "./models/starbucks.model.js";
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './swagger/config.js'

dotenv.config()
const app = express();

app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));


app.get('/users',async (req,res) => {
  const result = await User.find()
  // result.updateOne({personal:result.personal})
  
  res.send(result)
})




app.get('/starbucks', async (req,res) =>{
  const coffee = await Starbucks.find()

  res.send(coffee)
})




app.post('/user', async (req,res) => {
    const myuser = req.body.user
    
     // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
     const isValid = checkValidationEmail(myuser.email)
    //  const checkPhone =
     if(isValid){
         // 2. 가입환영 템플릿 만들기
         const mytemplate = getWelcomeTemplate(myuser)
         
         
         
         // 3. 이메일에 가입환영 템플릿 전송하기
         if(Object.keys(await Token.find({'phone':myuser.phone,'isAuth':true})).length !== 0){
              //주민등록 번호
                const data = JSON.stringify(req.body.user,(key,value) =>{
                return key === 'personal' ? `${value.substring(0,7).padEnd(14,"*")}` : value
              })
              const obj = JSON.parse(data)
                const user = new User({
                  ...obj
                })
                
                sendTemplateToEmail(myuser.email, mytemplate)
                
                ogAPI(myuser.prefer)
                
                await user.save()

                // id 추출
                // const _id = JSON.stringify(myuser,(key,value) => {
                //   return key === '_id' ? value : false
                // })

                // const test = JSON.stringify(obj)
                const username = await User.findOne({name:myuser.name})
                const _id = username._id
                res.send(_id)
                
          }else{
            res.status(422).send("에러!! 핸드폰번호가 인증되지 않았습니다.")
          }
         
     }

  })

  app.post('/tokens/phone',async (req,res) => {
    const myphone = req.body.phone
    // 1. 휴대폰번호 자릿수 맞는지 확인하기
    const isValid = checkValidationPhone(myphone)
    if(isValid){
        // 2. 핸드폰 토큰 6자리 만들기
        const mytoken = getToken()

        // 3. 핸드폰번호에 토큰 전송하기
        sendTokenToSMS(myphone, mytoken)
        res.send("인증번호가 전송되었습니다.")
        
        if (await Token.findOne({phone:myphone})){
            await Token.updateOne({phone:myphone},{token:mytoken})
        }
         else {
            const token = new Token({
                phone : myphone,
                token : mytoken,
                isAuth : false
            })
            await token.save()
        }
       
    
    } 




    
})


app.patch('/tokens/phone',async (req,res) =>{
  const myphone = req.body.phone
  const mytoken = req.body.token
  if(await Token.findOne({phone:myphone} && {isAuth:false} && {token:mytoken})){
      await Token.updateOne({isAuth:false},{isAuth:true})
      res.send("인증이 완료되었습니다.")
  }else{
      res.send("인증번호를 다시 확인해주세요.")
  }

  await Token.save()
  
})


mongoose.connect("mongodb://my-database:27017/codecamp")
                              //네임 리졸루션
// Bacnkend API 서버 오픈(리슨!)
app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})