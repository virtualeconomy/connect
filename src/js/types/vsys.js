/* @flow */

import type { $Path, $Common } from './params';
import type { Unsuccessful$ } from './response';

// get address

export type VsysAddress = {
    protocol: 'v.systems',
    api: number,
    opc: 'account',
    address: string,
    path: Array<number>,
    serializedPath: string,
}

export type $VsysGetAddress = $Common & {
    path: $Path,
    showOnTrezor?: boolean,
}

export type VsysGetAddress$ = {
    success: true,
    payload: VsysAddress,
} | Unsuccessful$;

// get public key

export type VsysPublicKey = {
    protocol: 'v.systems',
    api: number,
    opc: 'account',
    publicKey: string,
    address: string,
    path: Array<number>,
    serializedPath: string,
}

export type $VsysGetPublicKey = {
    path: $Path,
    showOnTrezor?: boolean,
}

export type VsysGetPublicKey$ = {
    success: true,
    payload: VsysPublicKey,
} | Unsuccessful$;

// get tx signature

export type VsysSignedTx = {
    protocol: 'v.systems',
    api: number,
    opc: 'signature',
    signature: string
}

export type VsysTransaction = {
    protocol: 'v.systems',
    api: number,
    opc: 'transaction',
    transactionType: number,
    senderPublicKey: string,
    amount?: number,
    fee: number,
    feeScale: number,
    recipient?: string,
    timestamp: number,
    attachment?: string,
    txId?: string,
}

export type $VsysSignTx = {
    path: $Path,
    tx: VsysTransaction
}

export type VsysSignedTx$ = {
    success: true,
    payload: VsysSignedTx,
} | Unsuccessful$;
