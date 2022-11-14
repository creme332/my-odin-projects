/* eslint-disable */

import {capitalize, reverseString, calculator, caesarCipher, analyzeArray} from './index.js'

describe('capitalize',()=>{
    test('empty string',()=>{
        expect(capitalize("")).toBe("");
    })
    test('letter',()=>{
        expect(capitalize("a")).toBe("A");
    })
    test('digit',()=>{
        expect(capitalize("4")).toBe("4");
    })
    test('punctuation',()=>{
        expect(capitalize(".")).toBe(",");
    })
    test('word',()=>{
        expect(capitalize("hello")).toBe("Hello");
    })
    test('words',()=>{
        expect(capitalize("hello world")).toBe("Hello world");
    })
})

describe('reverseString',()=>{
    test('empty string',()=>{
        expect(reverseString("")).toBe("");
    })
    test('letter',()=>{
        expect(reverseString("a")).toBe("a");
    })

    test('word',()=>{
        expect(reverseString("hello")).toBe("olleh");
    })

    test('palindrome',()=>{
        expect(reverseString("racecar")).toBe("racecar");
    })

    test('comma-separated words',()=>{
        expect(reverseString("hello, world")).toBe("dlrow ,olleh");
    })

    test('number',()=>{
        expect(reverseString("1234")).toBe("4321");
    })
})

describe('calculator',()=>{

    describe("add",()=>{
        test('single digit',()=>{
            expect(calculator.add(1,2)).toBe(3);
        });

        test('negative and positive ',()=>{
            expect(calculator.add(-1,2)).toBe(1);
        });

        test('large numbers',()=>{
            expect(calculator.add(999999999,999999999)).toBe(1999999998);
        });

        test('stringified positive numbers',()=>{
            expect(calculator.add("10","52")).toBe(62);
        });

        test('stringified negative numbers',()=>{
            expect(calculator.add("-10","-52")).toBe(-62);
        });

        test('numbers with exponents',()=>{
            expect(calculator.add(10e2,-5)).toBe(95);
        });

        test('floating point numbers',()=>{
            expect(calculator.add(10/3,4/3)).toBeCloseTo(14/3);
        });

    });

    describe("subtract",()=>{
        test('single digit',()=>{
            expect(calculator.subtract(1,2)).toBe(-1);
        });

        test('negative and positive ',()=>{
            expect(calculator.subtract(-1,2)).toBe(-3);
        });

        test('large negative numbers',()=>{
            expect(calculator.subtract(-9999999,-2313232)).toBe(-7686767);
        });

        test('stringified numbers',()=>{
            expect(calculator.subtract("10","52")).toBe(-42);
        });

        test('stringified negative numbers',()=>{
            expect(calculator.subtract("-10","-52")).toBe(42);
        });

        test('numbers with exponents',()=>{
            expect(calculator.subtract(10e2,-5)).toBe(95);
        });

        test('floating point numbers',()=>{
            expect(calculator.subtract(10/3,5/3)).toBeCloseTo(5/3);
        });

    });

    describe("multiply",()=>{
        test('zero',()=>{
            expect(calculator.multiply(0,2)).toBe(0);
        });

        test('negative and positive ',()=>{
            expect(calculator.multiply(-1,2)).toBe(-2);
        });

        test('large negative numbers',()=>{
            expect(calculator.multiply(-9999999,-2313232)).toBeCloseTo(2.3132318e+13);
        });

        test('stringified numbers',()=>{
            expect(calculator.multiply("10","52")).toBe(520);
        });

        test('stringified negative numbers',()=>{
            expect(calculator.multiply("-10","-52")).toBe(520);
        });

        test('numbers with exponents',()=>{
            expect(calculator.multiply(10e2,-5)).toBe(-500);
        });

        test('floating point numbers',()=>{
            expect(calculator.multiply(10/3,5/3)).toBeCloseTo(50/9);
        });

    });

    describe("divide",()=>{
        test('by zero',()=>{
            expect(calculator.divide(2,0)).toBeUndefined();
        });

        test('negative and positive ',()=>{
            expect(calculator.divide(-1,2)).toBeCloseTo(-0.5);
        });

        test('stringified numbers',()=>{
            expect(calculator.divide("10","52")).toBeCloseTo(10/52);
        });

        test('stringified negative numbers',()=>{
            expect(calculator.divide("-10","-52")).toBeCloseTo(10/52);
        });

        test('numbers with exponents',()=>{
            expect(calculator.divide(10e2,-5)).toBe(-20);
        });

        test('floating point numbers',()=>{
            expect(calculator.divide(10/3,5/3)).toBe(2);
        });

    });

})

describe('caesarCipher',()=>{

    test('empty string',()=>{
        expect(caesarCipher("")).toBe("");
    })

    test('letter',()=>{
        expect(caesarCipher("a")).toBe("b");
    })

    test('lowercase word',()=>{
        expect(caesarCipher("hello", 1)).toBe("ifmmp");
    })

    test('sentence with upper and lowercase',()=>{
        expect(caesarCipher("Jean is FAT", 5)).toBe("Ojfs nx KFY");
    })

    test('sentence with punctuation and numbers',()=>{
        expect(caesarCipher(`elon musketeer said gleefully:"call me on +432 432903 for free robux". Sam replied a resounding "NO!".`), 25).toBe(`dknm ltrjdsddq rzhc fkddetkkx:"bzkk ld nm +432 432903 enq eqdd qnatw". rzl qdokhdc z qdrntmchmf "mn!".`);
    })

    test('number',()=>{
        expect(caesarCipher("1234")).toBe("1234");
    })
})