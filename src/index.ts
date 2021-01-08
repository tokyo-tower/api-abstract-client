// tslint:disable:max-classes-per-file
/**
 * TTTS API Service Library for Javascript
 */
import * as factory from '@tokyotower/factory';

import { AuthClient } from './auth/authClient';

import { EventService } from './service/event';
import { SalesReportService } from './service/salesReport';
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
     * 売上レポートサービス
     */
    export class SalesReport extends SalesReportService { }
    /**
     * イベントサービス
     */
    export class Event extends EventService { }
}
