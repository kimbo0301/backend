import  express, { response } from "express";
import mongoose from 'mongoose'
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'
import {Token} from './models/token.model.js'
import dotenv from 'dotenv'
import cors from 'cors'
import { Starbucks } from "./models/starbucks.model.js";
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './swagger/config.js'
import {Getcontroller} from './controllers/get.controller.js'
import { usercontroller } from "./controllers/user.controller.js";
dotenv.config()
const app = express();

app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

const getcontroller = new Getcontroller()
app.get('/users',getcontroller.getUser)




app.get('/starbucks', async (req,res) =>{
  const coffee = await Starbucks.find()

  res.send(coffee)
})



const userController = new usercontroller()
app.post('/user',userController.postUser )

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