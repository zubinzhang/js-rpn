// Create by Zubin on 2019-01-23 18:18:02

const operatorRand = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
};

/**
 * 中缀表达式转换成逆波兰表达式
 * @param {string[]} str 中缀表达式
 */
export function convert(inputArr) {
  if (!Array.isArray(inputArr) || inputArr.length === 0) return [];

  const operatorArr = [];
  const outputArr = [];

  inputArr.forEach(input => {
    if (!Number.isNaN(Number(input))) {
      // 如果是数字，只接输出
      outputArr.push(input);
    } else if (input === '(') {
      // 如果是左括号，入操作符栈
      operatorArr.push(input);
    } else if (input === ')') {
      // 如果是右括号，循环输出，知道匹配到左括号为止
      while (operatorArr.length > 0) {
        const operator = operatorArr.pop();
        if (operator === '(') break;
        outputArr.push(operator);
      }
    } else {
      // 如果是运算符
      while (operatorArr.length >= 0) {
        const topOperator = operatorArr[operatorArr.length - 1];

        // 如果运算符栈为空，或者栈顶运算符是(，或者当前运算符优先级比栈顶运算符优先级高
        if (
          operatorArr.length === 0 ||
          topOperator === '(' ||
          operatorRand[input] > operatorRand[topOperator]
        ) {
          operatorArr.push(input);
          break;
        } else {
          outputArr.push(operatorArr.pop());
        }
      }
    }
  });

  // 输入循环结束，如果运算符栈不为空，循环输出
  while (operatorArr.length > 0) {
    outputArr.push(operatorArr.pop());
  }

  return outputArr;
}
