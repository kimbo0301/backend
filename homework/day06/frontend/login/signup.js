// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {

  let ph1 = document.getElementById('PhoneNumber01').value
  let ph2 = document.getElementById('PhoneNumber02').value
  let ph3 = document.getElementById('PhoneNumber03').value
  let myphone = ph1+ph2+ph3
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'
  console.log('인증 번호 전송')
  
  axios.post('http://localhost:3000/phone',{
    phone : myphone
  }).then((res)=>{
    
    console.log(res)
  })
  

}

// 회원 가입 API 요청
const submitSignup = async () => {
  console.log('회원 가입 이메일 전송')
  let name1 = document.getElementById('SignupName').value
  let personal1 = document.getElementById('SignupPersonal').value
  let prefer1 = document.getElementById('SignupPrefer').value
  let email1 = document.getElementById('SignupEmail').value
  let pwd1 = document.getElementById('SignupPwd').value
  let ph1 = document.getElementById('PhoneNumber01').value
  let ph2 = document.getElementById('PhoneNumber02').value
  let ph3 = document.getElementById('PhoneNumber03').value
  let myphone = ph1+ph2+ph3
  
  axios.post(`http://localhost:3000/signup`,{
    user:{
    name : name1,
    personal : personal1,
    prefer : prefer1,
    email : email1,
    pwd : pwd1,
    phone : myphone
    }
  }).then((res)=>{
    
  })
}
