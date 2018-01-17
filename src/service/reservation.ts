import * as factory from '@motionpicture/ttts-factory';
import { NO_CONTENT, OK } from 'http-status';

import { Service } from '../service';

/**
 * 予約検索条件インターフェース
 * @export
 * @interface
 */
export interface ISearchConditions {
    status?: factory.reservationStatusType;
    performanceId?: string;
    performanceStartFrom?: Date;
    performanceStartThrough?: Date;
    performanceEndFrom?: Date;
    performanceEndThrough?: Date;
}

/**
 * 予約サービス
 * @class
 */
export class ReservationService extends Service {
    /**
     * IDで予約検索
     */
    public async findById(params: {
        id: string;
    }): Promise<factory.reservation.event.IReservation> {
        return this.fetch({
            uri: `/reservations/${params.id}`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 予約検索
     */
    public async search(
        /**
         * 検索条件
         */
        params: ISearchConditions
    ): Promise<factory.reservation.event.IReservation[]> {
        return this.fetch({
            uri: '/reservations',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 入場追加
     */
    public async addCheckin(params: {
        reservationId: string;
        checkin: factory.reservation.event.ICheckin;
    }): Promise<void> {
        return this.fetch({
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
        return this.fetch({
            uri: `/reservations/${params.reservationId}/checkins/${params.when.toISOString()}`,
            method: 'DELETE',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
