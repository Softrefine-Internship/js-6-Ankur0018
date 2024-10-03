// Write a JavaScript function that takes a callback and invokes it after a delay of 2 second.

const delayFunc = function (callback) {
  console.log(`Executing this function after 2 sec....`);
  setTimeout(() => {
    callback();
  }, 2000);
};

const testFunc = function () {
  console.log(`This test function got executed after 2 secs`);
};

delayFunc(testFunc);
