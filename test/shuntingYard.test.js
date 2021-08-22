const { expect } = require('@jest/globals');
const { evaluate } = require('../shuntingYard');
const testCases = require('./testCases.json');

const testEvaluator = (title, expression, groundTruth) => {
  test(title, () => {
    expect(evaluate(expression)).toBe(groundTruth);
  });
}

testCases.forEach((testCase) => {
  testEvaluator(testCase.title, testCase.expression, testCase.groundTruth)
});