import { BotInfo, ShortUser, UserInfo, Api } from '@top-gg/sdk';
import { EventEmitter } from 'events';
import { VoteWebhookManager } from './VoteWebhookManager';
import { VoteClientConfigOptions } from 'types';

export class VoteClient extends EventEmitter {
  private _authToken: string;
  private _webhookOptions: VoteClientConfigOptions['webhook'];

  constructor(options?: VoteClientConfigOptions) {
    super();
    this._authToken = options?.token ?? '';
    this._webhookOptions = options?.webhook;

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

  public setWebhookPath(path: string): this {
    if (!this._webhookOptions) {
      this._webhookOptions = {};
    }
    this._webhookOptions.path = path;
    return this;
  }

  public setWebhookPort(port: number): this {
    if (!this._webhookOptions) {
      this._webhookOptions = {};
    }
    this._webhookOptions.port = port;
    return this;
  }

  public setWebhookAuthorization(authorization: string): this {
    if (!this._webhookOptions) {
      this._webhookOptions = {};
    }
    this._webhookOptions.authorization = authorization;
    return this;
  }

  public hasToken(): boolean {
    return !!this._authToken || this._authToken !== '';
  }

  public async getVotes(): Promise<ShortUser[]> {
    if (!this.hasToken()) {
      throw new Error('[Top.gg Votes] Missing token!');
    }
    return await new Api(this._authToken).getVotes();
  }

  public async hasVoted(userId: string): Promise<boolean> {
    if (!this.hasToken()) {
      throw new Error('[Top.gg Votes] Missing token!');
    }
    if (!userId) throw new Error('[Top.gg Votes] Missing user ID!');
    return await new Api(this._authToken).hasVoted(userId);
  }

  public async getBot(botId: string): Promise<BotInfo> {
    if (!this.hasToken()) {
      throw new Error('[Top.gg Votes] Missing token!');
    }
    if (!botId) throw new Error('[Top.gg Votes] Missing bot ID!');
    return await new Api(this._authToken).getBot(botId);
  }

  public async getUser(userId: string): Promise<UserInfo> {
    if (!this.hasToken()) {
      throw new Error('[Top.gg Votes] Missing token!');
    }
    if (!userId) throw new Error('[Top.gg Votes] Missing user ID!');
    return await new Api(this._authToken).getUser(userId);
  }
}
