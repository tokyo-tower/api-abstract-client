import { OK } from 'http-status';

import { Service } from '../service';

export interface IAdmin {
    username: string;
    familyName: string;
    givenName: string;
    email: string;
    telephone: string;
}

/**
 * 管理者サービス
 */
export class AdminService extends Service {
    /**
     * 管理者検索
     */
    public async search(params: {
        group?: string;
    }): Promise<IAdmin[]> {
        return this.fetch({
            uri: '/admins',
            method: 'GET',
            expectedStatusCodes: [OK],
            qs: params
        })
            .then(async (response) => response.json());
    }
}
