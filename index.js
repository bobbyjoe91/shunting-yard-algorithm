const { evaluate } = require('./shuntingYard');

// https://www.juraganles.com/2018/07/contoh-soal-matematika-kelas-6-bab-operasi-hitung-campuran.html
let mixedOperation = '(564-4-1) + 9.8 / 5 / 2-7 / 1.6647 / 7'; // 559.3792912
let mixedOperation2 = '(-1 * 5) - 2';

console.log(`${mixedOperation} = ${evaluate(mixedOperation)}`);
console.log(`${mixedOperation2} = ${evaluate(mixedOperation2)}`);