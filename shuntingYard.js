const calculate = (numStr1, symbol, numStr2) => {
  let operand1 = Number(numStr1), 
    operand2 = Number(numStr2);

  if (symbol !== 'min' && !numStr2) {
    throw 'Invalid operator';
  }

  switch (symbol) {
    case 'min':
      return -operand1;

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
      numStr2 = (symbol === 'min') ? null : evaluationStack.pop(); // pop the top item in stack
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
    'min': 3,
    '^': 4,
    '(': 5
  }
  const input = [...infix.replace(/\s+/g, '')];

  let oprStack = []; // operator stack
  let output = [];
  let stackLength = oprStack.length;
  let topOfStack = '';
  let symbol;

  for (let i = 0; i < input.length; i++) {
    prevSymbol = (i > 0) ? input[i-1] : null;
    symbol = input[i];
    stackLength = oprStack.length;
    // console.log(i, symbol)
    // check if symbol is an operand (better use try ... catch ...)
    if (!isNaN(symbol)) {
      if ((!isNaN(prevSymbol) || prevSymbol === '.') && prevSymbol) {
        output[output.length - 1] += symbol;
      } else {
        output.push(symbol);
      }
    } else if (symbol === '.') {
      output[output.length - 1] += symbol;
    } else if (symbol === '-' && (!prevSymbol || isNaN(prevSymbol)) && prevSymbol !== ')') {
      oprStack.push('min')
    } 
    else { // if symbol is an operator
      if ((stackLength === 0) || (PRECEDENCE[symbol] > PRECEDENCE[topOfStack]) || (topOfStack === '(')) {
        oprStack.push(symbol);
      } else if (PRECEDENCE[symbol] === PRECEDENCE[topOfStack]) {
        output.push(oprStack.pop());
        oprStack.push(symbol);
      } else if (PRECEDENCE[symbol] < PRECEDENCE[topOfStack]) {

        // pop all stack content
        while ((topOfStack !== '(') && (oprStack.length > 0)) {
          output.push(oprStack.pop());
          topOfStack = oprStack[oprStack.length - 1];
        }

        oprStack.push(symbol); // push symbol
      } else if (symbol === ')') {

        // pop stack until '(' is found
        while (topOfStack !== '(') {
          output.push(oprStack.pop());
          topOfStack = oprStack[oprStack.length - 1];
        }

        oprStack.pop() // pop the '('
      }
    }

    // update top of stack
    topOfStack = oprStack[oprStack.length - 1];
  }

  // pop all stack content after input is empty
  oprStack.reverse();
  output = output.concat(oprStack);

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