import { count } from '../src/count';

describe('test/count.test.js', () => {
  it('12+', () => {
    expect(count(['1', '2', '+'])).toBe(3);
  });

  it('123-45+*+62/+', () => {
    expect(count(['1', '2', '3', '-', '4', '5', '+', '*', '+', '6', '2', '/', '+'])).toBe(-5);
  });

  it('无效的表达式', () => {
    expect(() => count(['1', '2', '!'])).toThrowError(/无效的表达式/);
  });

  it('非数组返回0', () => {
    expect(count(1)).toBe(0);
    expect(count('1')).toBe(0);
    expect(count({})).toBe(0);
    expect(count(null)).toBe(0);
    expect(count(undefined)).toBe(0);
    expect(count(Symbol('#1'))).toBe(0);
  });

  it('空数组返回0', () => {
    expect(count([])).toBe(0);
  });

  it('非法的逆波兰表达式', () => {
    // const args = ['1', '2', '+', '-'];
    expect(() => count(['1', '2', '+', '-'])).toThrowError(/无效的表达式/);
  });

  it('负数', () => {
    expect(count(['-1', '2', '+'])).toBe(1);
  });

  it('小数', () => {
    expect(count(['0.1', '0.2', '+'])).toBe(0.3);
  });

  it('Infinity', () => {
    expect(count(['1', '0', '/'])).toBe(Infinity);
    expect(count(['-1', '0', '/'])).toBe(-Infinity);
  });
});
