// tslint:disable:no-implicit-dependencies

/**
 * placeOrder transaction tttsapi.service test
 * @ignore
 */

import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as tttsapi from '../../index';

import { StubAuthClient } from '../../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('注文取引サービス', () => {
    let sandbox: sinon.SinonSandbox;
    let transactions: tttsapi.service.transaction.PlaceOrder;

    before(() => {
        const auth = new StubAuthClient();
        transactions = new tttsapi.service.transaction.PlaceOrder({
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

    it('取引開始結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.start({
            expires: new Date(),
            sellerIdentifier: 'sellerIdentifier',
            purchaserGroup: <any>'purchaserGroup',
            passportToken: 'passportToken'
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('座席仮予約結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.createSeatReservationAuthorization({
            transactionId: 'transactionId',
            performanceId: 'performanceId',
            offers: []
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('座席予約取消結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.cancelSeatReservationAuthorization({
            transactionId: 'transactionId',
            actionId: 'actionId'
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('クレジットカードオーソリ結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.createCreditCardAuthorization({
            transactionId: 'transactionId',
            orderId: 'orderId',
            amount: 123,
            method: 'method',
            creditCard: <any>{}
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('クレジットカードオーソリ取消結果が期待通り', async () => {
        const data = undefined;
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.cancelCreditCardAuthorization({
            transactionId: 'transactionId',
            actionId: 'actionId'
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('購入者情報登録結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.setCustomerContact({
            transactionId: 'transactionId',
            contact: <any>{}
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('取引確定結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.confirm({
            transactionId: 'transactionId',
            paymentMethod: <any>'CreditCard'
        });
        assert.deepEqual(result, data);
    });

    it('メール通知結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.sendEmailNotification({
            transactionId: 'transactionId',
            emailMessageAttributes: <any>{}
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
