// tslint:disable:no-implicit-dependencies

/**
 * admin service test
 * @ignore
 */

import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as tttsapi from '../index';

import { StubAuthClient } from '../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('管理者サービス', () => {
    let sandbox: sinon.SinonSandbox;
    let adminService: tttsapi.service.Admin;

    before(() => {
        const auth = new StubAuthClient();
        adminService = new tttsapi.service.Admin({
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

    it('グループ取得の結果が期待通り', async () => {
        const data: any[] = [];
        sandbox.mock(adminService).expects('fetch').once().resolves(data);
        const result = await adminService.getGroups();

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('プロフィール取得の結果が期待通り', async () => {
        const data: any = {};
        sandbox.mock(adminService).expects('fetch').once().resolves(data);
        const result = await adminService.getProfile();

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('検索結果が期待通り', async () => {
        const data: any[] = [];
        sandbox.mock(adminService).expects('fetch').once().resolves(data);
        const result = await adminService.search({});

        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
