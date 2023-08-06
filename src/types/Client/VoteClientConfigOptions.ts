import type { VoteWebhookManagerOptions } from '../Webhook/VoteWebhookManagerOptions';

export type VoteClientConfigOptions = {
  /**
   * @description Your top.gg token
   */
  token: string;
  webhook?: Omit<VoteWebhookManagerOptions, 'client'>;
};
