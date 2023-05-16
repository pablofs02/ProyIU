import { spyOn } from '@vitest/spy';
import { test, expect } from 'vitest';


const evenFunction = {
    even(a: number) {
        return a % 2 === 0;
    }
}

test('test numbers', () => {
    expect(1 + 1).toBe(2);
})

test('test string', () => {
    expect("hello").toBe("hello");
})

test('test even()', () => {
    expect(evenFunction.even(2)).toBe(true);
    expect(evenFunction.even(3)).toBe(false);
    expect(evenFunction.even(4)).not.toBe(false);
})

test('test number of times a function is called', () => {
    const evenSpy = spyOn(evenFunction, 'even');
    
    for (let i = 0; i < 10; ++i) {
        evenFunction.even(i);
    }

    expect(evenSpy).toBeCalledTimes(10);
})

test('test falsy and truthy values', () => {
    expect(0).toBeFalsy();
    expect("").toBeFalsy();
    expect("hello").toBeTruthy();
    expect(null).toBeFalsy();
    expect(undefined).toBeFalsy();
    expect([]).toBeTruthy();
})