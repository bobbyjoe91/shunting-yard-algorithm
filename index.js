const { evaluate } = require('./shuntingYard');

let mixedOperation = '7^2+3*(4^2+3+2)'; // 559.3792912
// let mixedOperation2 = '(-1 * 5) - 2';

console.log(`${mixedOperation} = ${evaluate(mixedOperation)}`);