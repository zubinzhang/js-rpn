import { convert } from '../src/convert';

describe('test/convert.test.js', () => {
  it('非数组返回[]', () => {
    expect(convert(1)).toEqual([]);
    expect(convert('1')).toEqual([]);
    expect(convert({})).toEqual([]);
    expect(convert(null)).toEqual([]);
    expect(convert(undefined)).toEqual([]);
    expect(convert(Symbol('#1'))).toEqual([]);
  });

  it('空数组返回[]', () => {
    expect(convert([])).toEqual([]);
  });
  it('1 + 2', () => {
    const args = ['1', '+', '2'];
    expect(convert(args)).toEqual(['1', '2', '+']);
  });
  it('1 + 2 * 3', () => {
    const args = ['1', '+', '2', '*', '3'];
    expect(convert(args)).toEqual(['1', '2', '3', '*', '+']);
  });
  it('( 1 + 2 ) * 3', () => {
    const args = ['(', '1', '+', '2', ')', '*', '3'];
    expect(convert(args)).toEqual(['1', '2', '+', '3', '*']);
  });
  it('( 1 + 2 + 3 ) * 4', () => {
    const args = ['(', '1', '+', '2', '+', '3', ')', '*', '4'];
    expect(convert(args)).toEqual(['1', '2', '+', '3', '+', '4', '*']);
  });

  it('( 1 + 0.2 + 3 ) * 4', () => {
    const args = ['(', '1', '+', '0.2', '+', '3', ')', '*', '4'];
    expect(convert(args)).toEqual(['1', '0.2', '+', '3', '+', '4', '*']);
  });

  it('( 1 + 2 + -3 ) * 4', () => {
    const args = ['(', '1', '+', '2', '+', '-3', ')', '*', '4'];
    expect(convert(args)).toEqual(['1', '2', '+', '-3', '+', '4', '*']);
  });
  it('( 1 + 2 + -3 ) * 4', () => {
    const args = ['(', '1', '+', '2', '+', '-3', ')', '*', '4'];
    expect(convert(args)).toEqual(['1', '2', '+', '-3', '+', '4', '*']);
  });

  it('1+((2-3)*(4+5))+((6/2))', () => {
    const args = [
      '1',
      '+',
      '(',
      '(',
      '2',
      '-',
      '3',
      ')',
      '*',
      '(',
      '4',
      '+',
      '5',
      ')',
      ')',
      '+',
      '(',
      '(',
      '6',
      '/',
      '2',
      ')',
      ')',
    ];
    expect(convert(args)).toEqual([...'123-45+*+62/+']);
  });
});
