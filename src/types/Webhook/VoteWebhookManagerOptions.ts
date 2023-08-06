import { VoteClient } from '../..';

export type VoteWebhookManagerOptions = {
  client: VoteClient;
  port?: number;
  path?: string;
};
