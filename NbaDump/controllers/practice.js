// Call Backs --  >

// function reach(){
//     console.log("23")
// }

// function power(mycallback){
//     return mycallback
// }

// power(reach())





// Promises and it's types

// const reach = new Promise((resolve , reject)=>{
//     reject("2000")
// })

// reach.then(console.log("Resolved"),
// console.log("REjected")).catch((err)=>{
//     console.log(err)
// })
// const promiseA = new Promise((resolve, reject) => {
//     reject(777);
//   });
//   // At this point, "promiseA" is already settled.
//   promiseA.then((val) => console.log("asynchronous logging has val:", val))
//   .catch((err)=>{
//     console.log("hello",err)
//   });
//   console.log("immediate logging");
  
  // produces output in this order:
  // immediate logging
  // asynchronous logging has val: 777




// Promise all

// function resolveTimeout(value, delay) {
//     return new Promise(
//       resolve => setTimeout(() => resolve(value), delay)
//     );
//   }
  
//    function rejectTimeout(reason, delay) {
//     return new Promise(
//         (resolve, reject)=> setTimeout(() => reject(reason), delay)
//       );
//     }

//     const allPromise = Promise.all([resolveTimeout(['potatoes', 'tomatoes'], 1000),
//     rejectTimeout(new Error('Out of fruits!'), 1000)]);


//     allPromise
//     .then((value)=>{console.log(value)})
//     .catch((err)=>{
//         console.log("values",err)
//     })



// Promise All Settled  -- > TO see If all the Promises are Working Correctly

// Promise.allSettled([
//     Promise.resolve(33),
//     new Promise((resolve) => setTimeout(() => resolve(66), 0)),
//     99,
//     Promise.reject(new Error("an error")),
//  ]).then((values) => console.log(values));




// Promise Any -- >  Even One Promise Fulfills it FUlfills The WHole Promise

//   const promise1 = Promise.reject(0);
//   const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
//   const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));
//   const promises = [promise1, promise2, promise3];
//   Promise.any(promises).then((value) => console.log(value));

//   Expected output: "quick"


// Promise Race  --> 

// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 500, 'one');
//   });
  
//   const promise2 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 100, 'two');
//   });
  
//   Promise.race([promise1, promise2]).then((value) => {
//     console.log(value);
//     // Both resolve, but promise2 is faster
//   });
  // Expected output: "two"
  



