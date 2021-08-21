const { evaluate } = require('./shuntingYard');

let mixedOperation = '(564-4-1) + 9.8 / 5 / 2-7 / 1.6647 / 7'; // 559.3792912

console.log(`${mixedOperation} = ${evaluate(mixedOperation)}`);