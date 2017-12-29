import * as factory from '@motionpicture/ttts-factory';
import { OK } from 'http-status';

import { Service } from '../service';

/**
 * パフォーマンス検索結果インターフェース
 * @export
 * @interface
 */
export interface ISearchPerformancesResult {
    meta: { number_of_performances: number; number_of_films: number; };
    data: factory.performance.IPerformanceWithAvailability[];
}

/**
 * event service
 * @class EventService
 */
export class EventService extends Service {
    /**
     * 上映イベント検索
     */
    public async searchPerformances(
        /**
         * 検索条件
         */
        params: factory.performance.ISearchConditions
    ): Promise<ISearchPerformancesResult> {
        return this.fetch({
            uri: '/performances',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        });
    }
}
