/* @flow */

import type { $VsysSignTx as VsysSignTx } from '../../../types/vsys';

export const prepareTx = (tx: VsysSignTx, newTx: any = {}) => {
    newTx['protocol'] = tx['protocol'];
    newTx['api'] = tx['api'];
    newTx['opc'] = tx['opc'];
    newTx['senderPublicKey'] = tx['senderPublicKey'];
    newTx['transactionType'] = tx['transactionType'];
    newTx['fee'] = tx['fee'];
    newTx['feeScale'] = tx['feeScale'];
    newTx['timestamp'] = tx['timestamp'];
    switch (tx.transactionType) {
        case 2:
            newTx['recipient'] = tx['recipient'];
            newTx['amount'] = tx['amount'];
            newTx['attachment'] = tx['attachment'];
            break;
        case 3:
            newTx['recipient'] = tx['recipient'];
            newTx['amount'] = tx['amount'];
            break;
        case 4:
            newTx['txId'] = tx['txId'];
            break;
    }
    return newTx;
};
