import { BotInfo, ShortUser, UserInfo, Api } from '@top-gg/sdk';
import { EventEmitter } from 'events';
import type { VoteClientConfigOptions } from '~/types/Client/VoteClientConfigOptions';

export class VoteClient extends EventEmitter {
  private _authToken: string;
  private _authorization: string;

  constructor(config?: VoteClientConfigOptions) {
    super();
    this._authToken = config?.token || '';
    this._authorization = config?.authorization || 'WEBHOOK';

    if (!this._authToken) {
      throw new Error('[Top.gg Votes] Missing token!');
    }
  }

  public setToken(token: string): this {
    this._authToken = token;
    return this;
  }

  public setAuthorization(authorization: string | null): this {
    this._authorization = authorization ?? 'WEBHOOK';
    return this;
  }

  public getAuthorization(): string {
    return this._authorization;
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
