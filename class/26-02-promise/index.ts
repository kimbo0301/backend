// new Promise((resolve,reject) => {
// 특정 작업 (API 보내기 등)

// if(성공!!){
//     resolver("철수")
// }
// if(실패!!) {
//     reject("에러에요!!!")
// }
// }).then(res =>{}).catch(err => {})

const fetchData = async () => {
  const result = await new Promise((resolve, reject) => {
    // 특정 작업 (API 보내기 등)
    setTimeout(() => {
      // 외부에 데이터 보내고 받는데 2초 걸림
      try {
        resolve("성공 시 받는 데이터");
      } catch (error) {
        reject("실패했습니다!!!");
      }
    }, 2000);
  }).then((res) => console.log(res));

  console.log(result);
};
