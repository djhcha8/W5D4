function range(start, end) {
  if (start > end) {
    return [];
  }
  let rest = range(start, (end - 1));
  return rest.concat([end]);
}

function sumRec(array) {
  if (array.length === 1) {
    return array[0];
  }
  let remainder = sumRec(array.slice(0, array.length - 1));
  return array[array.length - 1] + remainder;
}

function exp1(base, exp) {
  if (exp === 0) {
    return 1;
  }
  
  let product = exp1(base, exp - 1);
  return base * product;
}

function exp2(base, exp) {
  if (exp === 0) {
    return 1;
  } else if (exp === 1) {
    return base;
  }
  
  if (exp % 2 === 0) {
    return Math.pow(exp2(base, exp/2), 2);
  } else {
    return base * Math.pow(exp2(base, (exp-1) / 2), 2);
  }
}

function fibonacci(n) {
  if (n <= 2) {
    return [0, 1].slice(0, n);
  }
  
  let fibs = fibonacci(n-1);
  let last = fibs[fibs.length-1];
  let second_last = fibs[fibs.length-2];
  return fibs.concat(last + second_last);
}

function bsearch(arr, target) {
  if (arr.length === 0) {
    return - 1;
  }
  
  let mid = Math.floor(arr.length / 2);
  console.log(mid);
  let left = arr.slice(0,mid);
  console.log(left);
  let right = arr.slice(mid+1, arr.length);
  console.log(right);
  
  if (arr[mid] === target) {
    return mid;
  }
  
  if (target > arr[mid]) {
    return bsearch(right, target) + (mid + 1);
  } else {
    return bsearch(left, target);
  }  
}

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  let mid = Math.floor(arr.length/2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid, arr.length);
  
  
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {

  const merged = [];

  while (left.length > 0 && right.length > 0) {
    if (left[0] >= right[0]) {
      merged.push(right.shift());
    } else {
      merged.push(left.shift());
    }
  }
  return merged.concat(left.concat(right));
}


mergeSort([9,2,5,7,21,86,2]);


function subSets (arr) {
  if (arr.length === 0) {
    return [[]];
  }
  
  let last = arr[arr.length-1];
  let subs = subSets(arr.slice(0, arr.length-1));
  return subs.concat(subs.map(x => x.concat(last)));
}


subSets([1,2,3]);






