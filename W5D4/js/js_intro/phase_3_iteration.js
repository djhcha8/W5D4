Array.prototype.bubbleSort = function () {
  const sorted = this;
  let swapped = true;
  while (swapped === true) {
    swapped = false;
    let j = 0;
    for (let i = 0; i < (sorted.length - 1); i++) {
      j = i + 1;
      if (sorted[i] > sorted[j]) {
        swapped = true;
        [sorted[i], sorted[j]] = [sorted[j], sorted[i]];       
      }
    }  
  }
  return sorted;
};

String.prototype.subStrings = function () {
  const stringArr = this.split('');
  const subs = [];
  for (let i = 0; i <= (stringArr.length - 1); i++) {
    let j = i + 1;
    for (j; j <= this.length; j++) {
      subs.push(stringArr.slice(i, j).join(''));
    }
  }
  return subs;
};