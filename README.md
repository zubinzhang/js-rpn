# js-rpn

[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

[travis-image]: https://img.shields.io/travis/zubincheung/js-rpn.svg?style=flat-square
[travis-url]: https://travis-ci.org/zubincheung/js-rpn
[codecov-image]: https://img.shields.io/codecov/c/github/zubincheung/js-rpn.svg?style=flat-square
[codecov-url]: https://codecov.io/github/zubincheung/js-rpn?branch=master
[david-image]: https://img.shields.io/david/zubincheung/js-rpn.svg?style=flat-square
[david-url]: https://david-dm.org/zubincheung/js-rpn
[snyk-image]: https://snyk.io/test/npm/js-rpn/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/js-rpn


> Javascript 版本逆波兰算法

## 逆波兰表达式

- 中缀表达式(Infix Notation)
  是一个通用的算术或逻辑公式表示方法， 操作符是以中缀形式处于操作数的中间。比如`1 + 2 + 3`

- 前缀表达式(Prefix Notation)
  是指将运算符写在前面、操作数写在后面、不包含括号的表达式，而且为了纪念其发明者波兰数学家 Jan Lukasiewicz 所以前缀表达式也叫做**波兰表达式**。比如`- 1 + 2 3`

- 后缀表达式(Postfix Notation)
  与之相反，是指运算符写在操作数后面的不含括号的算术表达式，也叫做**逆波兰表达式**。比如`1 2 3 + -`

前后缀表达式的出现是为了方便计算机处理，它的运算符是按照一定的顺序出现，所以求值过程中并不需要使用括号来指定运算顺序，也不需要考虑运算符号（比如加减乘除）的优先级。**逆波兰表达式**在编译技术中有着普遍的应用。

### 中缀表达式转换成后缀表达式算法：

1. 从左至右扫描一中缀表达式。
2. 若读取的是操作数，则判断该操作数的类型，并将该操作数存入操作数堆栈
3. 若读取的是运算符：
   1. 该运算符为左括号”(“，则直接存入运算符堆栈。
   2. 该运算符为右括号”)”，则输出运算符堆栈中的运算符到操作数堆栈，直到遇到左括号为止。
   3. 该运算符为非括号运算符：
      1. 若运算符堆栈栈顶的运算符为括号，则直接存入运算符堆栈。
      2. 若比运算符堆栈栈顶的运算符优先级高或相等，则直接存入运算符堆栈。
      3. 若比运算符堆栈栈顶的运算符优先级低或者优先级相等，则输出栈顶运算符到操作数堆栈，直到比运算符堆栈栈顶的运算符优先级低或者为空时才将当前运算符压入运算符堆栈。
   4. 当表达式读取完成后运算符堆栈中尚有运算符时，则依序取出运算符到操作数堆栈，直到运算符堆栈为空。

流程图如下所示：
![ ](https://github.com/zubincheung/blog-images/blob/master/2018/reverse-polish.jpg?raw=true)

### 逆波兰表达式求值算法：

1. 循环扫描语法单元的项目。
2. 如果扫描的项目是操作数，则将其压入操作数堆栈，并扫描下一个项目。
3. 如果扫描的项目是一个二元运算符，则对栈的顶上两个操作数执行该运算。
4. 如果扫描的项目是一个一元运算符，则对栈的最顶上操作数执行该运算。
5. 将运算结果重新压入堆栈。
6. 重复步骤 2-5，堆栈中即为结果值。
