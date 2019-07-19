import * as factory from '@tokyotower/factory';
import { OK } from 'http-status';

import { ISearchResult, Service } from '../service';

/**
 * 注文サービス
 */
export class OrderService extends Service {
    /**
     * 照会キーで注文情報を取得する
     */
    public async findByOrderInquiryKey(params: {
        performanceDay: string;
        paymentNo: string;
        telephone: string;
    }): Promise<factory.order.IOrderInquiryResult> {
        return this.fetch({
            uri: '/orders/findByOrderInquiryKey',
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 注文を検索する
     */
    public async search(
        params: factory.order.ISearchConditions
    ): Promise<ISearchResult<factory.order.IOrder[]>> {
        return this.fetch({
            uri: '/orders',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => {
                return {
                    totalCount: Number(<string>response.headers.get('X-Total-Count')),
                    data: await response.json()
                };
            });
    }
}
