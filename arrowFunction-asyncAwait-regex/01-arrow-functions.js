// ARROW FUNCTIONS TRAINING EXERCISES
// Complete the TODOs below. Test in browser console.

console.log("=== ARROW FUNCTIONS EXERCISES ===");

// 1. Basic Arrow Function Syntax
// TODO: Convert this function declaration to an arrow function
function add(a, b) {
    return a + b;
}
// const add = // YOUR CODE HERE
const add = (a, b) => a + b;

// TODO: Convert this function expression to an arrow function
const multiply = function(x, y) {
    return x * y;
};
// const multiply = // YOUR CODE HERE
const multiply = (x, y) => x * y;

// 2. Single Parameter Arrow Functions
// TODO: Create an arrow function that doubles a number (no parentheses needed)
const double = n => n * 2;

// TODO: Create an arrow function that returns the length of a string
const getLength = str => str.length;

// 3. Implicit Return
// TODO: Convert to arrow function with implicit return
function square(n) {
    return n * n;
}
const square = n => n * n;

// TODO: Create arrow function that returns an object (hint: wrap in parentheses)
function createUser(name, age) {
    return { name: name, age: age };
}
const createUser = (name, age) => ({ name, age });

// 4. Array Methods with Arrow Functions
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// TODO: Use arrow function with map to square all numbers
const squared = numbers.map(num => num * num);

// TODO: Use arrow function with filter to get even numbers
const evens = numbers.filter(num => num % 2 === 0);

// TODO: Use arrow function with reduce to sum all numbers
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

// 5. Arrow Functions vs Regular Functions (this binding)
const obj = {
    name: 'Training Object',
    
    regularMethod: function() {
        setTimeout(function() {
         console.log('Regular function:', this.name); // undefined
        }, 100);
    },
    
    arrowMethod: function() {
        setTimeout(() => {
            console.log('Arrow function:', this.name); // 'Training Object'
        }, 100);
    }
};

// 6. Complex Arrow Function Scenarios
const users = [
    { name: 'Alice', age: 25, active: true },
    { name: 'Bob', age: 30, active: false },
    { name: 'Charlie', age: 35, active: true }
];

// TODO: Chain methods - get names of active users, uppercase them
const activeUserNames = users
    .filter(user => user.active)
    .map(user => user.name.toUpperCase());

// TODO: Find user with specific criteria using arrow function
const userOver30 = users.find(user => user.age > 30);

// 7. Advanced: Higher-Order Functions
// TODO: Create a higher-order function that returns an arrow function
const multiplyBy = factor => number => factor * number;

// Test your functions (uncomment after completing TODOs):
/*
console.log('Addition:', add(5, 3));
console.log('Multiplication:', multiply(4, 7));
console.log('Double:', double(8));
console.log('String length:', getLength('JavaScript'));
console.log('Square:', square(6));
console.log('User object:', createUser('John', 25));
console.log('Squared numbers:', squared);
console.log('Even numbers:', evens);
console.log('Sum:', sum);
console.log('Active user names:', activeUserNames);
console.log('User over 30:', userOver30);

// Test higher-order function
const triple = multiplyBy(3);
console.log('Triple 4:', triple(4));
*/
