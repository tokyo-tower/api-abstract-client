// tslint:disable:max-classes-per-file
/**
 * TTTS API Service Library for Javascript
 */
import * as factory from '@tokyotower/factory';

import { AuthClient } from './auth/authClient';

import { AdminService } from './service/admin';
import { EventService } from './service/event';
import { OrderService } from './service/order';
import { OrganizationService } from './service/organization';
import { ReservationService } from './service/reservation';
import { TaskService } from './service/task';
import { PlaceOrderTransactionService } from './service/transaction/placeOrder';
import { ReturnOrderTransactionService } from './service/transaction/returnOrder';
import * as transporters from './transporters';

export import factory = factory;
export import transporters = transporters;

/**
 * auth client abstract class
 * 認証クライアント抽象クラス
 */
export abstract class Auth extends AuthClient { }

export namespace service {
    /**
     * 管理者サービス
     */
    export class Admin extends AdminService { }
    /**
     * event service
     */
    export class Event extends EventService { }
    /**
     * 注文サービス
     */
    export class Order extends OrderService { }
    /**
     * 組織サービス
     */
    export class Organization extends OrganizationService { }
    /**
     * 予約サービス
     */
    export class Reservation extends ReservationService { }
    /**
     * タスクサービス
     */
    export class Task extends TaskService { }
    export namespace transaction {
        /**
         * 注文取引サービス
         */
        export class PlaceOrder extends PlaceOrderTransactionService { }
        /**
         * 返品取引サービス
         */
        export class ReturnOrder extends ReturnOrderTransactionService { }
    }
}
