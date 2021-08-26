import {
    addDeclaration,
    addDonation,
    getPositiveNumber,
    getNegativeNumber,
    getListDeclaration,
    getListDonation,
    getTotalDonation 
} from '..';

import { VMContext, Context, u128 } from 'near-sdk-as';

const owner = 'ttnguyen999.testnet';
const firstUser = 'ttnguyen999_2.testnet';
const secondUser = 'ttnguyen999_3.testnet';

describe('VN-Covid Testing', () => {
    beforeEach(() => {
        // VMContext.setPredecessor_account_id(owner);
        VMContext.setAccount_balance(u128.from('5000000000000000000000000'));
        VMContext.setCurrent_account_id(owner);
        VMContext.setSigner_account_id(owner);
    });

    it('Add new declaration', () => {
        addDeclaration('test', 'test address', true);
        expect(getPositiveNumber()).toBe(1, 'Can\'t add new declaration');
        expect(getNegativeNumber()).toBe(0, 'Can\'t add new declaration');
    });

    it('Update exist declaration', () => {
        addDeclaration('Updated Name', 'updated address', false);
        expect(getPositiveNumber()).toBe(0, 'Can\'t add new declaration');
        expect(getNegativeNumber()).toBe(1, 'Can\'t add new declaration');
    });

    it('FirstUser add declaration', () => {
        addDeclaration('Owner declare', 'Owner address', false);

        VMContext.setCurrent_account_id(firstUser);
        VMContext.setSigner_account_id(firstUser);

        addDeclaration('First user declare', 'First user address', false);
        expect(getPositiveNumber()).toBe(0, 'Can\'t add new declaration');
        expect(getNegativeNumber()).toBe(2, 'Can\'t add new declaration');
    });

    it('Add donation', () => {
        addDonation();
        addDonation();

        VMContext.setCurrent_account_id(firstUser);
        VMContext.setSigner_account_id(firstUser);
        VMContext.setAccount_balance(u128.from('2000000000000000000000000'));

        addDonation();

        VMContext.setCurrent_account_id(secondUser);
        VMContext.setSigner_account_id(secondUser);
        VMContext.setAccount_balance(u128.from('2000000000000000000000000'));

        addDonation();

        expect(getTotalDonation()).toBe(u128.from('4000000000000000000000000'), 'Not record donation');

    })
});
