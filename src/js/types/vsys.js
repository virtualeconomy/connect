/* @flow */

import type { $Path, $Common } from './params';
import type { Unsuccessful$ } from './response';

// get address

export type VsysAddress = {
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
    publicKey: string,
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

