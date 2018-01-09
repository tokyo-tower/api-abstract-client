// tslint:disable:no-implicit-dependencies

/**
 * reservation service test
 * @ignore
 */

import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as tttsapi from '../index';

import { StubAuthClient } from '../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('予約サービス', () => {
    let sandbox: sinon.SinonSandbox;
    let reservations: tttsapi.service.Reservation;

    before(() => {
        const auth = new StubAuthClient();
        reservations = new tttsapi.service.Reservation({
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

    it('IDで予約検索結果が期待通り', async () => {
        const data: any[] = [];
        sandbox.mock(reservations).expects('fetch').once().resolves(data);
        const result = await reservations.findById({
            id: 'id'
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('予約検索結果が期待通り', async () => {
        const data: any[] = [];
        sandbox.mock(reservations).expects('fetch').once().resolves(data);
        const result = await reservations.search({
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('入場追加結果が期待通り', async () => {
        const data: any[] = [];
        sandbox.mock(reservations).expects('fetch').once().resolves(data);
        const result = await reservations.addCheckin({
            reservationId: 'reservationId',
            checkin: {
                when: new Date(),
                where: 'where',
                why: 'why',
                how: 'how'
            }
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('入場取消結果が期待通り', async () => {
        const data: any[] = [];
        sandbox.mock(reservations).expects('fetch').once().resolves(data);
        const result = await reservations.cancelCheckin({
            reservationId: 'reservationId',
            when: new Date()
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
