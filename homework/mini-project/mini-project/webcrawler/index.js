import mongoose from 'mongoose'
import puppeteer from 'puppeteer'
import {Starbucks} from './models/starbucks.model.js'

mongoose.connect("mongodb://localhost:27017/codecamp")

export async function startCrawling(){
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()
    await page.setViewport({width: 1280,height:720})
    await page.goto("https://www.starbucks.co.kr/menu/drink_list.do")
    await page.waitForTimeout(100)

    
    // const price = await page.$eval("body > table.type2 > tbody > tr:nth-child(3) > td:nth-child(2) > span",(el) => el.textContent)
    // 
    // console.log(price)
    
    // const framePage = await page.frames().find(el => el.url().includes("/item/sise_day.naver?code=005930"))
    //여러개의 iframe 각각을 el로 el의 내가 원하는 url이 포함되어있는지 확인

    for(let i = 1; i <= 10; i++){
        await page.waitForTimeout(100)
        const name = await page.$eval(`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(2) > ul > li:nth-child(${i}) > dl > dd`,(el) => el.textContent)
        const image = await page.$eval(`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(2) > ul > li:nth-child(${i}) > dl > dt > a > img`,(el) => el.src)
        
        console.log(`이름: ${name}, 이미지:${image}`)

       const starbucks = new Starbucks({
            name: name,
            image: image
        })

        await starbucks.save()
    }

    await browser.close()



}


startCrawling()