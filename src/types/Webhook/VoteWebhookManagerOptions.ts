import { VoteClient } from '../..';

export type VoteWebhookManagerOptions = {
  client: VoteClient;
  /**
   * @description The port of your webhook
   */
  port?: number;
  /**
   * @description The path of your webhook
   */
  path?: string;
  /**
   * @description The password of your webhook
   */
  authorization?: string;
};
