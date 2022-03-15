export function checkNumber(guest){
    let guestSplit = guest.split("-")
    if(guestSplit[0].length !== 6 || guestSplit[1].length !== 7){
        console.log("에러발생!!! 갯수를 제대로 입력해주세요!!!")
    }else if(guest.includes("-") === false){
        console.log("에러발생!!! 형식이 올바르지 않습니다!!!")
    }else{
        return true
    }
}

const handleEdit = require('../day06/Assignment/handleEdit.js')





export function hideNumber(guest) {
        let guestSplit = guest.split("-")
        let guestHide = guestSplit[1].split("")

        for(let i = 1; i < guestHide.length; i++){
        guestHide[guestHide.length-i] = "*"
        }
        
        console.log(guestSplit[0] + "-" + guestHide.join(""))
}
