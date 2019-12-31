/* @flow */

import AbstractMethod from './AbstractMethod';
import { validateParams, getFirmwareRange } from './helpers/paramsValidator';
import { getMiscNetwork } from '../../data/CoinInfo';
import { validatePath } from '../../utils/pathUtils';
import { prepareTx } from './helpers/vsysSignTx';

import type { CoreMessage } from '../../types';
import type { VsysSignedTx } from '../../types/trezor';
import type { $VsysSignTx as Transaction } from '../../types/vsys';

type Params = {
    path: Array<number>,
    protocol: string,
    api: number,
    opc: string,
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

export default class VsysSignTx extends AbstractMethod {
    params: Params;

    constructor(message: CoreMessage) {
        super(message);

        this.requiredPermissions = ['read', 'write'];
        this.firmwareRange = getFirmwareRange(this.name, getMiscNetwork('Vsys'), this.firmwareRange);

        const payload: Object = message.payload;

        // validate incoming parameters
        validateParams(payload, [
            { name: 'path', obligatory: true },
        ]);

        const path: Array<number> = validatePath(payload.path, 3);

        this.info = 'Sign VSYS transaction';

        const tx: Transaction = payload;
        validateParams(tx, [
            { name: 'protocol', type: 'string', obligatory: true },
            { name: 'api', type: 'number', obligatory: true },
            { name: 'opc', type: 'string', obligatory: true },
            { name: 'transactionType', type: 'number', obligatory: true },
            { name: 'senderPublicKey', type: 'string', obligatory: true },
            { name: 'fee', type: 'number', obligatory: true },
            { name: 'feeScale', type: 'number', obligatory: true },
            { name: 'amount', type: 'number'},
            { name: 'timestamp', type: 'number', obligatory: true },
            { name: 'recipient', type: 'string' },
            { name: 'attachment', type: 'string' },
            { name: 'txId', type: 'string' },
        ]);

        const transaction: Transaction = prepareTx(tx);

        this.params = {
            path,
            transaction
        };
    }

    async run(): Promise<VsysSignedTx> {
        return await this.device.getCommands().vsysSignTx(
            this.params.path,
            this.params.transaction
        );
    }
}
