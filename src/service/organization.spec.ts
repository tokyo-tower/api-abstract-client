// tslint:disable:no-implicit-dependencies

/**
 * organization service test
 * @ignore
 */

import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as tttsapi from '../index';

import { StubAuthClient } from '../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('識別子で企業組織検索', () => {
    let sandbox: sinon.SinonSandbox;
    let organizations: tttsapi.service.Organization;

    before(() => {
        const auth = new StubAuthClient();
        organizations = new tttsapi.service.Organization({
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

    it('結果が期待通り', async () => {
        const data = {
            identifier: 'identifier'
        };
        sandbox.mock(organizations).expects('fetch').once().resolves(data);

        const result = await organizations.findCorporationByIdentifier({
            identifier: data.identifier
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
