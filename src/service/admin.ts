/**
 * 管理者サービス
 * @namespace service.admin
 */

import { OK } from 'http-status';

import { Service } from '../service';

export interface IAdmin {
    username: string;
    familyName: string;
    givenName: string;
    email: string;
    telephone: string;
}

export interface IGroup {
    name: string;
    description: string;
}

/**
 * order service
 * @class
 */
export class AdminService extends Service {
    /**
     * ログイン中管理者のプロフィールを取得する
     */
    public async getProfile(): Promise<IAdmin> {
        return this.fetch({
            uri: '/admins/me',
            method: 'GET',
            expectedStatusCodes: [OK]
        });
    }
    /**
     * ログイン中管理者のグループを取得する
     */
    public async getGroups(): Promise<IGroup[]> {
        return this.fetch({
            uri: '/admins/me/groups',
            method: 'GET',
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 管理者検索
     */
    public async search(params: {
        group?: string;
    }): Promise<IAdmin> {
        return this.fetch({
            uri: '/admins',
            method: 'GET',
            expectedStatusCodes: [OK],
            qs: params
        });
    }
}
