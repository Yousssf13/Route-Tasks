
///////////////////////////////////////////////////////////(1)

let num = Number("123") + 7;
console.log(num); // 130
///////////////////////////////////////  (2)

function checkFalsy(value) {
  if (!value) return "Invalid";
  return value;
}

console.log(checkFalsy(0)); // "Invalid"
//////////////////////////////////////////////////////////////////// (3)
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) continue;
  console.log(i);
}
// Output: 1,3,5,7,9
/////////////////////////////////////////////////////////////////// (4)
function getEven(arr) {
  return arr.filter(num => num % 2 === 0);
}

console.log(getEven([1,2,3,4,5])); // [2,4]
/////////////////////////////////////////////////////////////////// (5)
let merged = [...[1,2,3], ...[4,5,6]];
console.log(merged); // [1,2,3,4,5,6]

/////////////////////////////////////////////////////////////////////(6)
function getDay(num) {
  switch(num) {
    case 1: return "Sunday";
    case 2: return "Monday";
    case 3: return "Tuesday";
    case 4: return "Wednesday";
    case 5: return "Thursday";
    case 6: return "Friday";
    case 7: return "Saturday";
    default: return "Invalid";
  }
}

console.log(getDay(2)); // Monday
////////////////////////////////////////////////////////(7)

function getLengths(arr) {
  return arr.map(str => str.length);
}

console.log(getLengths(["a","ab","abc"])); // [1,2,3]
/////////////////////////////////////////////////////////////////////////(8)
function checkDivisible(num) {
  if (num % 3 === 0 && num % 5 === 0) {
    return "Divisible by both";
  }
  return "Not divisible by both";
}

console.log(checkDivisible(15)); // "Divisible by both"

///////////////////////////////////////////////////////////////////(9)
const square = n => n * n;

console.log(square(5)); // 25
///////////////////////////////////////////////////////////////////(10)
function describePerson(person) {
  const { name, age } = person;
  return `${name} is ${age} years old`;
}

console.log(describePerson({name:"John", age:25}));
// John is 25 years old
////////////////////////////////////////////////////////////////(11)

function sum(...nums) {
  return nums.reduce((a,b) => a + b, 0);
}

console.log(sum(1,2,3,4,5)); // 15
////////////////////////////////////////////////////////////////////(12)

function delayedSuccess() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Success"), 3000);
  });
}

delayedSuccess().then(console.log); // "Success"

/////////////////////////////////////////////////////////////(13)
function getLargest(arr) {
  return Math.max(...arr);
}

console.log(getLargest([1,3,7,2,4])); // 7
//////////////////////////////////////////////////////////////////////////(14)

function getKeys(obj) {
  return Object.keys(obj);
}

console.log(getKeys({name:"John", age:30})); 
// ["name", "age"]
///////////////////////////////////////////////////////////////////////////////(15)

function splitWords(str) {
  return str.split(" ");
}

console.log(splitWords("The quick brown fox"));
// ["The","quick","brown","fox"]



/////////////////////////////////////////////////////////////////////////////////////////////////

