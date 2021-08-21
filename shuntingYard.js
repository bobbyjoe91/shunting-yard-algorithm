const calculate = (numStr1, symbol, numStr2) => {
  let operand1 = Number(numStr1), 
    operand2 = Number(numStr2);

  switch (symbol) {
    case '+':
      return operand1 + operand2;

    case '-':
      return operand1 - operand2;

    case '*':
      return operand1 * operand2;

    case '/':
      return operand1 / operand2;

    case '^':
      return operand1 ** operand2;

    default:
      throw 'Invalid operator';
  }
}

const rpnEvaluator = (rpn) => {
  const evaluationStack = [];
  let numStr1, numStr2, tempResult, symbol;

  for (let i = 0; i < rpn.length; i++) {
    symbol = rpn[i];

    if (!isNaN(symbol)) {
      evaluationStack.push(symbol);
    } else {
      numStr2 = evaluationStack.pop(); // pop the top item in stack
      numStr1 = evaluationStack.pop(); // pop the item after that

      tempResult = calculate(numStr1, symbol, numStr2);

      evaluationStack.push(tempResult);
    }
  }

  return evaluationStack[0];
};

const convertToPostfix = (infix) => {
  const PRECEDENCE = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '^': 3,
    '(': 4
  }
  const oprStack = []; // operator stack
  const input = [...infix];

  let output = [];
  let stackLength = oprStack.length;
  let topOfStack = '';
  let symbol;

  for (let i = 0; i < input.length; i++) {
    symbol = input[i];
    stackLength = oprStack.length;

    // check if symbol is an operand (better use try ... catch ...)
    if (!isNaN(symbol)) {
      if (!isNaN(input[i-1]) || input[i-1] === '.') {
        output[output.length - 1] += symbol;
      } else {
        output.push(symbol);
      }
    } else if (symbol === '.') {
      output[output.length - 1] += symbol;
    } else { // if symbol is an operator
      if (stackLength === 0) { // if stack is empty
        oprStack.push(symbol);
      } else if ((PRECEDENCE[symbol] > PRECEDENCE[topOfStack]) || (topOfStack === '(')) {
        oprStack.push(symbol);
      } else if (PRECEDENCE[symbol] === PRECEDENCE[topOfStack]) {
        output.push(oprStack.pop());
        oprStack.push(symbol);
      } else if (PRECEDENCE[symbol] < PRECEDENCE[topOfStack]) {
        // pop all stack content
        while (stackLength > 0) {
          output.push(oprStack.pop());
          stackLength = oprStack.length;
        }

        oprStack.push(symbol); // push symbol
      } else if (symbol === ')') {
        // pop stack until '(' is found
        while (topOfStack !== '(') {
          output.push(oprStack.pop());
          stackLength = oprStack.length;
          topOfStack = oprStack[stackLength - 1];
        }

        oprStack.pop() // pop the '('
      }
    }

    stackLength = oprStack.length; // update stack length
    topOfStack = oprStack[stackLength - 1]; // update top of stack
  }

  // pop all stack content after input is empty
  while (oprStack.length > 0) {
    output.push(oprStack.pop());
  }

  return output;
};

const evaluate = (expr) => {
  let reversePolishNotation = convertToPostfix(expr);
  let result = rpnEvaluator(reversePolishNotation);

  return result;
};

module.exports = {
  evaluate
};