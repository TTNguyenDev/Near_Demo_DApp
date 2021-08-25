import { u128 } from 'near-sdk-as'

@nearBindgen
export class UserInfo {
    name: string;
    address: string;
    isPos: boolean;

    constructor(
        _name: string,
        _address: string,
        _isPos: boolean
    ) {
        this.name = _name;
        this.address = _address;
        this.isPos = _isPos;
    }
}

@nearBindgen
export class DonationInfo {
    accountId: string;
    amount: u128;

    constructor(
        _accountId: string,
        _amount: u128,
    ) {
        this.accountId = _accountId;
        this.amount = _amount;
    }
}

