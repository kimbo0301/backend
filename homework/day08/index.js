import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'
import express  from 'express'
import dotenv from 'dotenv'
import { Phone } from './models/mongodb.js'
import mongoose from 'mongoose'
dotenv.config()


const app = express();

app.use(express.json())

app.post('/tokens/phone',async (req,res) => {
    const myphone = req.body.phone
    let mytoken = ''


    // 1. 휴대폰번호 자릿수 맞는지 확인하기
    const isValid = checkValidationPhone(myphone)
    if(isValid){
        // 2. 핸드폰 토큰 6자리 만들기
        const mytoken = getToken()

        // 3. 핸드폰번호에 토큰 전송하기
        sendTokenToSMS(myphone, mytoken)
        
        res.send("인증완료")
        
         if (await Phone.findOne({phone:myphone})){
            await Phone.updateOne({phone:myphone},{token:mytoken})
        }
         else {
            const phone = new Phone({
                phone : myphone,
                token : mytoken,
                isAuth : false
            })
            await phone.save()
        }
       
    
    } 
    
})

app.patch('/tokens/phone',async (req,res) =>{
    const myphone = req.body.phone
    const mytoken = req.body.token
    if(await Phone.findOne({phone:myphone} && {isAuth:false} && {token:mytoken})){
        await Phone.updateOne({isAuth:false},{isAuth:true})
        res.send("true")
    }else{
        res.send("false")
    }

    await Phone.save()
    
})

mongoose.connect("mongodb://my-database:27017/codecamp")

app.listen(3100, () => {
    console.log(`Example app listening on port ${3100}`)
  })
  