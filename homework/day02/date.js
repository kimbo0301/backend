function Now(){
    const date = new Date()
    const yyyy = date.getFullYear()
    const MM = String(date.getMonth() + 1).padStart(2,"0")
    const dd = String(date.getDate()).padStart(2,"0")
    const hh = String(date.getHours()).padStart(2,"0")
    const mm = String(date.getMinutes()).padStart(2,"0")
    const ss = String(date.getSeconds()).padStart(2,"0")
    const createdAt = `오늘은 ${yyyy}년 ${MM}월 ${dd}일 ${hh}:${mm}:${ss} 입니다.`
    
    console.log(createdAt)

}

Now()