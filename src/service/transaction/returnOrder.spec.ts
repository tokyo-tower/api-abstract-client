// tslint:disable:no-implicit-dependencies

/**
 * 返品取引サービステスト
 * @ignore
 */

import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as tttsapi from '../../index';

import { StubAuthClient } from '../../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('返品取引サービス', () => {
    let sandbox: sinon.SinonSandbox;
    let transactions: tttsapi.service.transaction.ReturnOrder;

    before(() => {
        const auth = new StubAuthClient();
        transactions = new tttsapi.service.transaction.ReturnOrder({
            auth: auth,
            endpoint: API_ENDPOINT
        });
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('取引確定結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.confirm({
            performanceDay: '20180105',
            paymentNo: '123456',
            cancellationFee: 1000,
            forcibly: false,
            reason: tttsapi.factory.transaction.returnOrder.Reason.Customer
        });
        assert.deepEqual(result, data);
    });
});
