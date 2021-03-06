import * as qs from 'qs';

import { AuthClient } from './auth/authClient';
import { DefaultTransporter, Transporter } from './transporters';

/**
 * service constructor options
 */
export interface IOptions {
    /**
     * API endpoint
     * @example
     * http://localhost:8081
     */
    endpoint: string;
    /**
     * OAuth2 client object
     */
    auth?: AuthClient;
    /**
     * transporter object
     */
    transporter?: Transporter;
    /**
     * サービスを使用するプロジェクト
     */
    project?: { id?: string };
}

export interface IFetchOptions {
    uri: string;
    form?: any;
    qs?: any;
    method: string;
    headers?: {
        [key: string]: any;
    };
    body?: any;
    expectedStatusCodes: number[];
}

/**
 * base service class
 */
export class Service {
    public options: IOptions;

    constructor(options: IOptions) {
        this.options = options;
    }

    /**
     * Create and send request to API
     */
    public async fetch(options: IFetchOptions) {
        const defaultOptions = {
            headers: {},
            method: 'GET'
        };
        // tslint:disable-next-line:no-parameter-reassignment
        options = { ...defaultOptions, ...options };

        let baseUrl = this.options.endpoint;
        // tslint:disable-next-line:no-single-line-block-comment
        /* istanbul ignore else */
        if (this.options.project !== undefined
            && this.options.project !== null
            && typeof this.options.project.id === 'string'
            && this.options.project.id.length > 0) {
            baseUrl = `${baseUrl}/projects/${this.options.project.id}`;
        }
        let url = `${baseUrl}${options.uri}`;

        const querystrings = qs.stringify(options.qs);
        url += (querystrings.length > 0) ? `?${querystrings}` : '';

        const headers = {
            ...{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            ...options.headers
        };

        const fetchOptions = {
            method: options.method,
            headers: headers,
            body: JSON.stringify(options.body)
        };

        // create request (using authClient or otherwise and return request obj)
        if (this.options.auth !== undefined) {
            return this.options.auth.fetch(url, fetchOptions, options.expectedStatusCodes);
        } else {
            const transporter =
                (this.options.transporter !== undefined) ? this.options.transporter : new DefaultTransporter(options.expectedStatusCodes);

            return transporter.fetch(url, fetchOptions);
        }
    }
}

/**
 * 検索結果インターフェース
 */
export interface ISearchResult<T> {
    /**
     * マッチ数
     */
    totalCount?: number;
    /**
     * マッチデータ
     */
    data: T;
}
