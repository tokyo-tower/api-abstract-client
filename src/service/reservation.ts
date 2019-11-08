import * as factory from '@tokyotower/factory';
import { NO_CONTENT, OK } from 'http-status';

import { ISearchResult, Service } from '../service';

/**
 * 予約サービス
 */
export class ReservationService extends Service {
    public async findById(params: {
        id: string;
    }): Promise<factory.reservation.event.IReservation> {
        return this.fetch({
            uri: `/reservations/${params.id}`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 予約検索
     */
    public async search(
        /**
         * 検索条件
         */
        params: factory.reservation.event.ISearchConditions
    ): Promise<ISearchResult<factory.reservation.event.IReservation[]>> {
        return this.fetch({
            uri: '/reservations',
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
     * 予約検索
     */
    public async distinct(
        field: string,
        /**
         * 検索条件
         */
        conditions: factory.reservation.event.ISearchConditions
    ): Promise<any[]> {
        return this.fetch({
            uri: `/reservations/distinct/${field}`,
            method: 'GET',
            qs: conditions,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 入場追加
     */
    public async addCheckin(params: {
        reservationId: string;
        checkin: factory.reservation.event.ICheckin;
    }): Promise<void> {
        await this.fetch({
            uri: `/reservations/${params.reservationId}/checkins`,
            method: 'POST',
            body: params.checkin,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 入場追加
     */
    public async cancelCheckin(params: {
        reservationId: string;
        when: Date;
    }): Promise<void> {
        await this.fetch({
            uri: `/reservations/${params.reservationId}/checkins/${params.when.toISOString()}`,
            method: 'DELETE',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 予約キャンセル
     */
    public async cancel(params: {
        id: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/reservations/${params.id}/cancel`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
