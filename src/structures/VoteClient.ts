import { BotInfo, ShortUser, UserInfo, Api } from '@top-gg/sdk';
import { EventEmitter } from 'events';
import type { VoteClientConfigOptions } from '~/types/Client/VoteClientConfigOptions';
import { VoteWebhookManager } from './VoteWebhookManager';

export class VoteClient extends EventEmitter {
  private _authToken: string;
  private _webhookOptions: VoteClientConfigOptions['webhook'];

  constructor(options?: VoteClientConfigOptions) {
    super();
    this._authToken = options?.token ?? '';
    this._webhookOptions = options?.webhook;

    if (!this._authToken || this._authToken === '') {
      throw new Error('[Top.gg Votes] Missing token!');
    }

    if (this._webhookOptions) {
      new VoteWebhookManager({
        ...this._webhookOptions,
        client: this,
      }).startWebhookServer();
    }
  }

  public setToken(token: string): this {
    this._authToken = token;
    return this;
  }

  public setWebhook(options: Required<VoteClientConfigOptions['webhook']>): this {
    this._webhookOptions = options;
    return this;
  }

  public async getVotes(): Promise<ShortUser[]> {
    return await new Api(this._authToken).getVotes();
  }

  public async hasVoted(userId: string): Promise<boolean> {
    if (!userId) throw new Error('[Top.gg Votes] Missing user ID!');
    return await new Api(this._authToken).hasVoted(userId);
  }

  public async getBot(botId: string): Promise<BotInfo> {
    if (!botId) throw new Error('[Top.gg Votes] Missing bot ID!');
    return await new Api(this._authToken).getBot(botId);
  }

  public async getUser(userId: string): Promise<UserInfo> {
    if (!userId) throw new Error('[Top.gg Votes] Missing user ID!');
    return await new Api(this._authToken).getUser(userId);
  }
}
