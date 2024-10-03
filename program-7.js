// Write a JavaScript program to implement a function that executes a given function repeatedly at a fixed interval using 'setInterval()'.

const executeFunc = function (func, time) {
  return setInterval(func, time);
};

const printHello = function () {
  console.log("Hello");
};

executeFunc(printHello, 2000);
