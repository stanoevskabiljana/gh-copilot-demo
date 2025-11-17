import {describe, it} from 'mocha';
import {expect} from 'chai';

import {validateDate, validateIPV6} from './validators';

// test the validateDate function
describe('validateDate', () => {
    it('should return a date object when given a valid date string', () => {
        const date = '01/01/2019';
        const expectedDate = new Date(2019, 0, 1);
        expect(validateDate(date)).to.deep.equal(expectedDate);
    });

    it('should throw an error when given an invalid date string', () => {
        const date = 'invalid-date';
        expect(() => validateDate(date)).to.throw();
    });
});
