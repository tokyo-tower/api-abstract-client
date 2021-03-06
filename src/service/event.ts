import * as factory from '@tokyotower/factory';
import { NO_CONTENT, OK } from 'http-status';

import { ISearchResult, Service } from '../service';

/**
 * パフォーマンス検索結果インターフェース
 */
export interface ISearchPerformancesResult {
    data: factory.performance.IPerformance[];
}

/**
 * イベントサービス
 */
export class EventService extends Service {
    /**
     * イベント検索
     */
    public async search(params: factory.performance.ISearchConditions): Promise<ISearchResult<ISearchPerformancesResult>> {
        return this.fetch({
            uri: '/performances',
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

    /**
     * 拡張属性を更新する
     */
    public async updateExtension(params: {
        id: string;
        checkedReservations?: factory.performance.ICheckedReservation[];
        reservationsAtLastUpdateDate?: factory.performance.IReservationAtLastupdateDate[];
        onlineSalesStatusUpdateUser?: string;
        onlineSalesStatusUpdateAt?: Date;
        eventStatus?: factory.chevre.eventStatusType;
        evServiceStatusUpdateUser?: string;
        evServiceStatusUpdateAt?: Date;
        refundStatus?: factory.performance.RefundStatus;
        refundStatusUpdateUser?: string;
        refundStatusUpdateAt?: Date;
        startDate?: Date;
        endDate?: Date;
        additionalProperty?: factory.chevre.propertyValue.IPropertyValue<string>[];
    }): Promise<void> {
        await this.fetch({
            uri: `/performances/${params.id}/extension`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
