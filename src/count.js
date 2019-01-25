function compute(leftNum, rightNum, operator) {
  switch (operator) {
    case '+':
      return leftNum + rightNum;
    case '-':
      return leftNum - rightNum;
    case '*':
      return leftNum * rightNum;
    default:
      // 除法
      return leftNum / rightNum;
  }
}

/**
 * 计算逆波兰表达式
 * @param {string} str 逆波兰表达式
 */
export function count(reversePolishArr) {
  if (!Array.isArray(reversePolishArr) || reversePolishArr.length === 0) return 0;

  if (!reversePolishArr.every(input => !isNaN(input) || ['+', '-', '*', '/'].includes(input))) {
    throw new Error(`无效的表达式：${reversePolishArr.join(',')}`);
  }

  const tmpArr = [];

  reversePolishArr.forEach(input => {
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
  });

  return Number(tmpArr[0].toFixed(3));
}
