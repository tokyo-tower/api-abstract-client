/**
 * 注文サービス
 * @namespace service.order
 */

import * as factory from '@motionpicture/ttts-factory';
import { OK } from 'http-status';

import { Service } from '../service';

/**
 * order service
 * @class
 */
export class OrderService extends Service {
    /**
     * 照会キーで注文情報を取得する
     */
    public async findByOrderInquiryKey(
        /**
         * 注文照会キー
         */
        params: factory.order.IOrderInquiryKey
    ): Promise<factory.order.IOrderInquiryResult> {
        return this.fetch({
            uri: '/orders/findByOrderInquiryKey',
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        });
    }
}
