import { NO_CONTENT } from 'http-status';

import { Service } from '../service';

/**
 * 券種カテゴリーレート制限サービス
 */
export class TicketTypeCategoryRateLimitService extends Service {
    public async lock(params: {
        ticketTypeCategory: string;
        performanceStartDate: Date;
        holder: string;
    }): Promise<void> {
        await this.fetch({
            uri: '/ticketTypeCategoryRateLimits/lock',
            method: 'POST',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    public async unlock(params: {
        ticketTypeCategory: string;
        performanceStartDate: Date;
        holder: string;
    }): Promise<void> {
        await this.fetch({
            uri: '/ticketTypeCategoryRateLimits/unlock',
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
