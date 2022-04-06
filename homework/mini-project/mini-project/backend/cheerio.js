import axios from "axios"
import cheerio from "cheerio"
import mongoose from "mongoose"
import {User} from "./models/user.model.js"

export async function ogAPI(mydata){

    const targetURL = mydata


    const aaa = await axios.get(targetURL)
        //객체로 받아옴
    const $ = cheerio.load(aaa.data)
        //객체가 아닌 문로 받아옴 aaa.data
    const og = {}
    $("meta").each((_,el) => {
        if($(el).attr('property')){
            
            // each 각각 실행 el은 각각의 메타태그를 의미
               const key =  $(el).attr('property') // og:title
                                    .split(":")[1] // ' : ' 을 기준으로 나눔 og    :   title
                //태그 컨트롤  meta태그의 property 속성을 찾고 : 스플릿으로 나누고 1번째 title을 가져옴
            
                const value = $(el).attr('content')
           
                if(key !== 'url'){
                    og[key] = value
                    
                    }
                
                    
            }

            
        })
           await User.updateMany({og})

    }

    