// tslint:disable:no-implicit-dependencies

/**
 * event service test
 * @ignore
 */

import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as sasaki from '../index';

import { StubAuthClient } from '../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('searchPerformances()', () => {
    let sandbox: sinon.SinonSandbox;
    let events: sasaki.service.Event;

    before(() => {
        const auth = new StubAuthClient();
        events = new sasaki.service.Event({
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
        const data: any[] = [];
        sandbox.mock(events).expects('fetch').once().resolves(data);
        const result = await events.searchPerformances({
            day: 'day',
            theater: 'theater'
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('fetch結果が正常でなければエラーになるはず', async () => {
        const error = new sasaki.transporters.RequestError('invalid request');
        sandbox.mock(events).expects('fetch').once().rejects(error);

        const result = await events.searchPerformances({
            day: 'day',
            theater: 'theater'
        }).catch((err) => err);

        assert.deepEqual(result, error);
        sandbox.verify();
    });
});
