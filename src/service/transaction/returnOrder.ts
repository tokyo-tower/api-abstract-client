/**
 * 返品取引サービス
 * @namespace service.transaction.returnOrder
 */

import * as factory from '@motionpicture/ttts-factory';
import { CREATED } from 'http-status';

import { Service } from '../../service';

/**
 * 確定結果インターフェース
 * @interface
 * @memberof service.transaction.returnOrder
 */
export interface IConfirmResult {
    id: string;
}

/**
 * 返品取引サービス
 * @class ReturnOrderTransactionService
 */
export class ReturnOrderTransactionService extends Service {
    /**
     * 取引確定
     * @returns {Promise<IConfirmResult>} 作成された取引
     */
    public async confirm(params: {
        /**
         * 開演日(YYYYMMDD)
         */
        performanceDay: string;
        /**
         * 購入番号
         */
        paymentNo: string;
        /**
         * 手数料
         */
        cancellationFee: number;
        /**
         * バリデーション強制無効フラグ
         */
        forcibly: boolean;
        /**
         * 返品理由
         */
        reason: factory.transaction.returnOrder.Reason
    }): Promise<IConfirmResult> {
        return this.fetch({
            uri: '/transactions/returnOrder/confirm',
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                performance_day: params.performanceDay,
                payment_no: params.paymentNo,
                cancellation_fee: params.cancellationFee,
                forcibly: params.forcibly,
                reason: params.reason
            }
        });
    }

    /**
     * 確定した取引に関して、購入者にメール通知を送信する
     * @returns {Promise<factory.task.sendEmailNotification.ITask>} メール送信タスク
     */
    public async sendEmailNotification(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * Eメールメッセージ属性
         */
        emailMessageAttributes: factory.creativeWork.message.email.IAttributes
    }): Promise<factory.task.sendEmailNotification.ITask> {
        return this.fetch({
            uri: `/transactions/returnOrder/${params.transactionId}/tasks/sendEmailNotification`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.emailMessageAttributes
        });
    }
}
