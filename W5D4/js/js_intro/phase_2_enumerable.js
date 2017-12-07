Array.prototype.myEach = function(callback) {
  for ( let i = 0; i < this.length; i++) {
    callback(this[i]);
  }
};

Array.prototype.myMap = function(callback) {
  const mapped = [];
  this.myEach((el) => {
    mapped.push(callback(el));
  });
  return mapped;
};

Array.prototype.myReduce = function(callback, accumulator) {
  let arr = this;
  let acc = accumulator;
  if (!acc) {
    acc = arr.shift();
  }
  
  arr.myEach((el) => {
    acc = callback(acc, el);
  });
  return acc;
};