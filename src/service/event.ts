import * as factory from '@tokyotower/factory';
import { NO_CONTENT, OK } from 'http-status';

import { ISearchResult, Service } from '../service';

/**
 * パフォーマンス検索結果インターフェース
 */
export interface ISearchPerformancesResult {
    meta: { number_of_performances: number; number_of_films: number };
    data: factory.performance.IPerformanceWithAvailability[];
}

/**
 * イベントサービス
 */
export class EventService extends Service {
    /**
     * イベント検索
     */
    public async search(
        /**
         * 検索条件
         */
        params: factory.performance.ISearchConditions
    ): Promise<ISearchResult<ISearchPerformancesResult>> {
        return this.fetch({
            uri: '/events',
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
     * イベント検索
     */
    public async searchPerformances(
        /**
         * 検索条件
         */
        params: factory.performance.ISearchConditions
    ): Promise<ISearchResult<ISearchPerformancesResult>> {
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

    public async findPerofrmanceById(params: {
        id: string;
    }): Promise<factory.performance.IPerformance> {
        return this.fetch({
            uri: `/performances/${params.id}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    public async updateExtension(params: {
        id: string;
        reservationsAtLastUpdateDate?: factory.performance.IReservationAtLastupdateDate[];
        onlineSalesStatus?: factory.performance.OnlineSalesStatus;
        onlineSalesStatusUpdateUser?: string;
        onlineSalesStatusUpdateAt?: Date;
        evServiceStatus?: factory.performance.EvServiceStatus;
        evServiceStatusUpdateUser?: string;
        evServiceStatusUpdateAt?: Date;
        refundStatus?: factory.performance.RefundStatus;
        refundStatusUpdateUser?: string;
        refundStatusUpdateAt?: Date;
    }): Promise<void> {
        await this.fetch({
            uri: `/performances/${params.id}/extension`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
