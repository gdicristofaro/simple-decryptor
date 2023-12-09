export const CONVERSION_MAP = {
    0: -5,
    1: 1,
    2: -1,
    3: 4,
    4: 1,
    5: -1,
    6: 3,
    7: -4,
    8: 3,
    9: -3,
    10: 4,
    11: -3,
    12: 4,
    13: 2,
    14: -4,
    15: -2,
    16: -4,
    17: 3,
    18: 4,
    19: 5,
    20: -3,
    21: 5,
    22: -4,
    23: 2,
    24: -5,
    25: -2
}

export const LETTERS_NUM = Object.keys(CONVERSION_MAP).length;

export type LetterNumber = keyof typeof CONVERSION_MAP

/**
 * converts a letter number (A=0, B=1, etc.) by encoding or decoding by the set number.
 * @param letterNumber The letter number (A=0, B=1, etc.)
 * @param setNumber The set letter number (A=0, B=1, etc.)
 * @returns The converted value or undefined if letterNumber or setNumber is invalid
 */
export function convertLetterNumber(
    letterNumber: LetterNumber,
    setNumber: LetterNumber): LetterNumber | undefined {

    if (letterNumber < 0 || setNumber < 0) {
        return undefined;
    } else {
        let conversionIndex = letterNumber - setNumber;
        while (conversionIndex < 0) {
            conversionIndex += LETTERS_NUM;
        }
        conversionIndex = conversionIndex % LETTERS_NUM;
        
        let delta = CONVERSION_MAP[conversionIndex as LetterNumber];

        let convertedLetterNumber = letterNumber + delta;
        while (convertedLetterNumber < 0) {
            convertedLetterNumber += LETTERS_NUM;
        }
        convertedLetterNumber = convertedLetterNumber % LETTERS_NUM;
        
        return convertedLetterNumber as LetterNumber;
    }
}

/**
 * Converts text to converted text (either encoded or decoded by set 
 * letter number). Non-alphabetic characters are not converted.
 * @param text The text.
 * @param setLetterNumber The letter number indicating the set. 
 * @returns The converted value.
 */
export function convert(text: string, setLetterNumber: LetterNumber): string {
    let converted = '';

    for (let idx = 0; idx < text.length; idx++) {
        let charCode = text.charCodeAt(idx);
        if (charCode >= 65 && charCode <= 90) {
            let val = convertLetterNumber(charCode - 65 as LetterNumber, setLetterNumber);
            if (val !== undefined) {
                converted += String.fromCharCode(val + 65);
            }
        } else if (charCode >= 97 && charCode <= 122) {
            let val = convertLetterNumber(charCode - 97 as LetterNumber, setLetterNumber);
            if (val !== undefined) {
                converted += String.fromCharCode(val + 97);
            }
        } else {
            converted += text.charAt(idx);
        }
    }
    return converted;
}