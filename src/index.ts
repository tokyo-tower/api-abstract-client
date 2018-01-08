// tslint:disable:max-classes-per-file

/**
 * TTTS API Service Library for Javascript
 * @ignore
 */

import * as factory from '@motionpicture/ttts-factory';

import { AuthClient } from './auth/authClient';

import { EventService } from './service/event';
import { OrderService } from './service/order';
import { OrganizationService } from './service/organization';
import { PlaceOrderTransactionService } from './service/transaction/placeOrder';
import { ReturnOrderTransactionService } from './service/transaction/returnOrder';
import * as transporters from './transporters';

export import factory = factory;
export import transporters = transporters;

/**
 * auth client abstract class
 * 認証クライアント抽象クラス
 * @export
 * @class
 * @abstract
 */
export abstract class Auth extends AuthClient { }

export namespace service {
    /**
     * event service
     * @class
     */
    export class Event extends EventService { }
    /**
     * 注文サービス
     * @class
     */
    export class Order extends OrderService { }
    /**
     * 組織サービス
     * @class
     */
    export class Organization extends OrganizationService { }
    export namespace transaction {
        /**
         * 注文取引サービス
         * @class
         */
        export class PlaceOrder extends PlaceOrderTransactionService { }
        /**
         * 返品取引サービス
         * @class
         */
        export class ReturnOrder extends ReturnOrderTransactionService { }
    }
}
