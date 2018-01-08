// tslint:disable:no-implicit-dependencies

/**
 * order service test
 * @ignore
 */

import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as tttsapi from '../index';

import { StubAuthClient } from '../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('注文照会', () => {
    let sandbox: sinon.SinonSandbox;
    let orders: tttsapi.service.Order;

    before(() => {
        const auth = new StubAuthClient();
        orders = new tttsapi.service.Order({
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

    it('fetch結果が正常であればそのまま取得できるはず', async () => {
        const data = {};
        sandbox.mock(orders).expects('fetch').once().resolves(data);

        const result = await orders.findByOrderInquiryKey({
            performanceDay: 'xxx',
            paymentNo: '123',
            telephone: 'xxx'
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
