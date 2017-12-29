// tslint:disable:max-classes-per-file

/**
 * TTTS API Service Library for Javascript
 * @ignore
 */

import * as factory from '@motionpicture/ttts-factory';

import { AuthClient } from './auth/authClient';

import { EventService } from './service/event';
import { PlaceOrderTransactionService } from './service/transaction/placeOrder';
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
    export namespace transaction {
        /**
         * placeOrder transaction service
         * @class
         */
        export class PlaceOrder extends PlaceOrderTransactionService { }
    }
}
