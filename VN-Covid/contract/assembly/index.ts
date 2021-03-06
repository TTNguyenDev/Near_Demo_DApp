import { Context, logging, u128, PersistentVector, ContractPromiseBatch, PersistentMap } from 'near-sdk-as'
import { DonationInfo, UserInfo } from './model'; 

const DEFAULT_DONATION: u128 = u128.from("1000000000000000000000000"); // 1 NEAR

/****************
 *   STORAGE    *
 ****************/

const UserInfoVector = new PersistentVector<UserInfo>('u');
const UserInfoMap = new PersistentMap<string, u32>('um');
const DonationVector = new PersistentVector<DonationInfo>('d');

let foundation_account_id: string;


/****************
 * VIEW METHODS *
 ****************/

export function getPositiveNumber(): u64 {
    let total = 0;
    for (let i = 0; i < UserInfoVector.length; i++) {
        if (UserInfoVector[i].isPos == true) {
            total ++;
        }
    }
    logging.log('getPositiveNumber totalNumber');
    return total;
}

export function getNegativeNumber(): u64 {
    let total = 0;
    for (let i = 0; i < UserInfoVector.length; i++) {
        if (UserInfoVector[i].isPos != true) {
            total ++;
        }
    }
    logging.log('getNegativeNumber totalNumber');
    return total;
}

export function getTotalDeclaration(): u64 {
    return UserInfoVector.length;
}

export function getListDeclaration(): Array<UserInfo> {
    const result = new Array<UserInfo>(UserInfoVector.length);
    
    for(let i = 0; i < UserInfoVector.length; i++) {
        result[i] = UserInfoVector[i];
    }
    return result;
}

export function getListDonation(): Array<DonationInfo> {
    const result = new Array<DonationInfo>(DonationVector.length);

    for (let i = 0; i < DonationVector.length; i++) {
        result[i] = DonationVector[i];
    }
    return result;
}

export function getTotalDonation(): u128 {
    let total: u128 = u128.from('0'); 

    for (let i = 0; i < DonationVector.length; i++) {
        logging.log(DonationVector[i].amount);
        total = u128.add(total, DonationVector[i].amount);
        logging.log(total);
    }
    return total;
}

export function isFoundation(): boolean {
    return Context.sender == foundation_account_id;
}

/******************
 * MODIFY METHODS *
 ******************/

export function addDeclaration(_name: string, _address: string, _isPos: boolean): void {
    logging.log('addDeclaration for ' + Context.sender);

    if (UserInfoMap.contains(Context.sender)) {
        logging.log('Already Exist');
        const index = UserInfoMap.getSome(Context.sender);

        let user = new UserInfo(_name, _address, _isPos);

        UserInfoVector[index] = user;
        logging.log(user);
    } else {
        logging.log('New declaration');
        let user = new UserInfo(_name, _address, _isPos);
        UserInfoVector.push(user);
        UserInfoMap.set(Context.sender, UserInfoVector.length - 1); 
    }
}

export function addDonation(): void {
    logging.log('addDonation for ' + Context.sender);

    ContractPromiseBatch.create(Context.sender).transfer(DEFAULT_DONATION);

    let donationInfo = new DonationInfo(Context.sender, DEFAULT_DONATION);
    DonationVector.push(donationInfo);
}

