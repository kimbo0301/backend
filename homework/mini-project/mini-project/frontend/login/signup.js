// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'
  let ph1 = document.getElementById('PhoneNumber01').value
  let ph2 = document.getElementById('PhoneNumber02').value
  let ph3 = document.getElementById('PhoneNumber03').value
  let myphone = ph1+ph2+ph3
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'
  alert("인증번호가 전송되었습니다.")
  
  await axios.post('http://localhost:3000/tokens/phone',{
    phone : myphone
  }).then((res)=>{
    
  })
}

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  let ph1 = document.getElementById('PhoneNumber01').value
  let ph2 = document.getElementById('PhoneNumber02').value
  let ph3 = document.getElementById('PhoneNumber03').value
  let myphone = ph1+ph2+ph3
  let token =  document.querySelector("#TokenInput").value
 
 await axios.patch('http://localhost:3000/tokens/phone',{
   phone : myphone,
   token : token
  }).then((res)=>{
    const a = JSON.stringify(res,(key,value) => {
      return key === 'data' ? value : value
    })
    const b = JSON.parse(a)
    alert(b.data)     
  })
}

// 회원 가입 API 요청
const submitSignup = async () => {
  let name = document.getElementById('SignupName').value
  let personal1 = document.getElementById('SignupPersonal1').value
  let personal2 = document.getElementById('SignupPersonal2').value
  let prefer = document.getElementById('SignupPrefer').value
  let email = document.getElementById('SignupEmail').value
  let pwd = document.getElementById('SignupPwd').value
  let ph1 = document.getElementById('PhoneNumber01').value
  let ph2 = document.getElementById('PhoneNumber02').value
  let ph3 = document.getElementById('PhoneNumber03').value
  let myphone = ph1+ph2+ph3
  let personal = `${personal1}-${personal2}` 
  axios.post(`http://localhost:3000/user`,{
    user:{
    name : name,
    personal : personal,
    prefer : prefer,
    email : email,
    pwd : pwd,
    phone : myphone
    }
  }).then((res)=>{
    if(JSON.stringify(res.status) === '200'){
      alert("회원가입이 완료되었습니다.")
    }else{
      alert("인증번호를 확인해주세요.")
    }
  })
}
