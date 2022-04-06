import { User } from "../models/user.model.js";

import {Token} from '../models/token.model.js'
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from './services/user.js'
import {ogAPI} from './services/cheerio.js'
export class usercontroller{ 
    postUser = async (req,res) => {
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

                const username = await User.findOne({name:myuser.name})
                const _id = username._id
                res.send(_id)
                
          }else{
            res.status(422).send("에러!! 핸드폰번호가 인증되지 않았습니다.")
          }
         
     }

  }
}