import { OK } from 'http-status';

import { Service } from '../service';

/**
 * 売上レポートサービス
 */
export class SalesReportService extends Service {
    /**
     * ストリーミング検索
     */
    public async stream(params: {
        $and: any[];
    }): Promise<NodeJS.ReadableStream | ReadableStream> {
        return this.fetch({
            uri: '/aggregateSales/stream',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => <NodeJS.ReadableStream | ReadableStream>response.body);
    }
}
