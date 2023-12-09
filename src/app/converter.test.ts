/**
 * @jest-environment jsdom
 */
import { CONVERSION_MAP, LETTERS_NUM, LetterNumber, convert, convertLetterNumber } from './converter';
// import * as convert from './converter'

it('conversion map is internally consistent', () => {
    for (let idx = 0; idx < LETTERS_NUM; idx++) {
        let delta = CONVERSION_MAP[idx as LetterNumber];

        let partnerIdx = idx + delta;
        if (partnerIdx < 0) {
            partnerIdx += LETTERS_NUM;
        }
        partnerIdx = partnerIdx % LETTERS_NUM;
        expect(delta * -1, `unexpected value for idx pair ${idx}, ${partnerIdx}`).toBe(CONVERSION_MAP[partnerIdx as LetterNumber]);
    }
})

it('converts letter numbers right', () => {
    expect(convertLetterNumber(0, 0), `letter number 0 set number 0`).toBe(21);
    expect(convertLetterNumber(2, 1), `letter number 1 set number 2`).toBe(3);
    expect(convertLetterNumber(6, 4), `letter number 4 set number 5`).toBe(5);

    expect(convertLetterNumber(21, 0), `letter number 0 set number 0`).toBe(0);
    expect(convertLetterNumber(3, 1), `letter number 1 set number 2`).toBe(2);
    expect(convertLetterNumber(5, 4), `letter number 4 set number 5`).toBe(6);
})

it("converts \"Let's be SpIeS!( ͡~ ͜ʖ ͡°)\"", () => {
    expect(convert("VvV", 0), "letter number 0 gets converted to A").toBe("AaA");
    expect(convert("Let's be SpIeS!( ͡~ ͜ʖ ͡°)", 0)).toBe("Ify'w cf WnLfW!( ͡~ ͜ʖ ͡°)");
    expect(convert("Ify'w cf WnLfW!( ͡~ ͜ʖ ͡°)", 0)).toBe("Let's be SpIeS!( ͡~ ͜ʖ ͡°)");
})