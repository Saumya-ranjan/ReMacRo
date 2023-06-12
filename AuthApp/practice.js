// Promise all In Here

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Delayed for 1 second.");
  }, "2000");
});

const q = new Promise((resolve, reject) => {
  resolve("Here allso done");
});

const r = new Promise((resolve, reject) => {
  resolve("Here r done as well");
});

const m = Promise.all([p, q, r])
  .then(() => {
    console.log("Error ON the WAy");
  })
  .then(() => {
    setTimeout(() => {
      console.log("after 2 then it will run");
    }, "2000");
  });
