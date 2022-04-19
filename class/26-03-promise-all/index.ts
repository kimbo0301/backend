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
  console.time("=== 개별 Promise 각각 ===");
  const result1 = await new Promise((resolve, reject) => {
    // 특정 작업 (API 보내기 등)
    setTimeout(() => {
      resolve("성공 시 받는 데이터");
    }, 2000);
  });

  const result2 = await new Promise((resolve, reject) => {
    // 특정 작업 (API 보내기 등)
    setTimeout(() => {
      resolve("성공 시 받는 데이터");
    }, 1000);
  });

  const result3 = await new Promise((resolve, reject) => {
    // 특정 작업 (API 보내기 등)
    setTimeout(() => {
      resolve("성공 시 받는 데이터");
    }, 3000);
  });
  console.timeEnd("=== 개별 Promise 각각 ===");
};

const fetchData2 = async () => {
  console.time("=== 단체 Promise.all ===");
  await Promise.all([
    new Promise((resolve, reject) => {
      // 특정 작업 (API 보내기 등)
      setTimeout(() => {
        resolve("성공 시 받는 데이터");
      }, 2000);
    }),
    new Promise((resolve, reject) => {
      // 특정 작업 (API 보내기 등)
      setTimeout(() => {
        resolve("성공 시 받는 데이터");
      }, 3000);
    }),
    new Promise((resolve, reject) => {
      // 특정 작업 (API 보내기 등)
      setTimeout(() => {
        resolve("성공 시 받는 데이터");
      }, 1000);
    }),
  ]);
  console.timeEnd("=== 단체 Promise.all ===");
};

fetchData();
fetchData2();
