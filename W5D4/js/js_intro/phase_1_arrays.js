Array.prototype.uniqArr = function() {
  const uniqArr = [];
  this.forEach((el) => {
    if (uniqArr.includes(el)) {
    } else {
      uniqArr.push(el);
    }
  });
  return uniqArr;
};


Array.prototype.twoSum = function() {
  const twoSum = [];
  
  for (let i = 0; i < (this.length - 1); i++) {
    for (let j = (i + 1); j < this.length; j++ ) {
      if (this[i] + this[j] === 0) {
        twoSum.push([i,j]);
      }
    }
  }
  return twoSum;
};

Array.prototype.transpose = function() {
  const transposed = [];
  for (let col = 0; col < this[0].length; col++) {
    let newRow = [];
    this.forEach((el) => {
      newRow.push(el[col]);
    });
  transposed.push(newRow);
  // newRow = [];
  }
  return transposed;
};




