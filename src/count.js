import { isNotOrEmptyArray } from './utils';

function compute(leftNum, rightNum, operator) {
  let result = 0;
  // eslint-disable-next-line default-case
  switch (operator) {
    case '+':
      result = leftNum + rightNum; break;
    case '-':
      result = leftNum - rightNum; break;
    case '*':
      result = leftNum * rightNum; break;
    case '/':
      result = leftNum / rightNum; break;
  }

  return result;
}
/**
 * 计算逆波兰表达式
 * @param {(number|string)[]} reversePolishArr 逆波兰表达式
 */
export function count(reversePolishArr) {
  if (isNotOrEmptyArray(reversePolishArr)) return 0;

  if (!reversePolishArr.every(input => !isNaN(input) || ['+', '-', '*', '/'].includes(input))) {
    throw new Error(`无效的表达式：${reversePolishArr.join(',')}`);
  }

  const tmpArr = [];

  for (const input of reversePolishArr) {
    if (!Number.isNaN(Number(input))) {
      // 数字接直接push
      tmpArr.push(Number(input));
    } else {
      // 运算符
      const num1 = tmpArr.pop();
      const num2 = tmpArr.pop();

      if (isNaN(num1) || isNaN(num2)) {
        throw new Error(`无效的表达式：${reversePolishArr.join(',')}`);
      }

      tmpArr.push(compute(num2, num1, input));
    }
  }

  return Number(tmpArr[0].toFixed(3));
}
