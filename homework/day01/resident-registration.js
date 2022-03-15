import {checkNumber,hideNumber} from "./resident-registration-number.js"

function registration (guest) {
    const isVaild = checkNumber(guest)
    if(isVaild === true){
        hideNumber(guest)
    }
}

registration("9102234-011212312000000")