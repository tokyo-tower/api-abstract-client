/**
 * 組織サービス
 */
import * as factory from '@motionpicture/ttts-factory';
import { OK } from 'http-status';

import { Service } from '../service';

/**
 * 組織サービス
 */
export class OrganizationService extends Service {
    /**
     * 識別子で企業組織検索
     */
    public async findCorporationByIdentifier(params: {
        /**
         * 組織識別子
         */
        identifier: string;
    }): Promise<factory.organization.corporation.IOrganization> {
        return this.fetch({
            uri: `/organizations/corporation/${params.identifier}`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }
}
