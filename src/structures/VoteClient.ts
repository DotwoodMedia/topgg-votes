import * as express from 'express';
import chalk from 'chalk';
import { Webhook, Api } from '@top-gg/sdk';
import { EventEmitter } from 'events';
import { BotInfo, ShortUser, UserInfo } from '@top-gg/sdk/dist/typings';

export interface IVoteClientConfig {
  token?: string;
  port?: number;
  authorization?: string;
}

export class VoteClient extends EventEmitter {
  private _authToken: string;
  private _port: number;
  private _authorization: string;

  constructor(config: IVoteClientConfig) {
    super();
    this._authToken = config.token || '';
    this._port = config.port || 22565;
    this._authorization = config.authorization || 'WEBHOOK';
  }

  public setToken(token: string): this {
    this._authToken = token;
    return this;
  }

  public setPort(port: number | null): this {
    this._port = port ?? 22565;
    return this;
  }

  public setAuthorization(authorization: string | null): this {
    this._authorization = authorization ?? 'WEBHOOK';
    return this;
  }

  public postWebhook() {
    if (!this._authorization) throw new Error('[Top.gg Votes] Missing authorization!');
    if (!this._port) throw new Error('[Top.gg Votes] Missing server port!');
    const webhook = new Webhook(this._authorization);
    const app = express();

    app.post(
      '/dblwebhook',
      webhook.listener((vote) => {
        if (vote.bot) {
          this.emit('botVote', {
            userId: vote.user,
            botId: vote.bot,
            isWeekend: vote.isWeekend,
            type: vote.type,
          });
        }
        if (vote.guild) {
          this.emit('serverVote', {
            userId: vote.user,
            guildId: vote.guild,
            type: vote.type,
          });
        }
      }),
    );

    app.listen(this._port, () => {
      console.log(
        chalk.white(chalk.bold('[Top.gg Votes]')),
        chalk.green(`Vote client is running on port ${this._port}`),
      );
    });
  }

  public async getVotes(): Promise<ShortUser[]> {
    if (!this._authToken) throw new Error('[Top.gg Votes] Missing token!');
    const API = new Api(this._authToken);
    const votes = await API.getVotes();
    return votes;
  }

  public async hasVoted(userId: string): Promise<boolean> {
    if (!this._authToken) throw new Error('[Top.gg Votes] Missing token!');
    if (!userId) throw new Error('[Top.gg Votes] Missing user ID!');
    const API = new Api(this._authToken);
    const voted = await API.hasVoted(userId);
    return voted;
  }

  public async getBot(botId: string): Promise<BotInfo> {
    if (!this._authToken) throw new Error('[Top.gg Votes] Missing token!');
    if (!botId) throw new Error('[Top.gg Votes] Missing bot ID!');
    const API = new Api(this._authToken);
    const info = await API.getBot(botId);
    return info;
  }

  public async getUser(userId: string): Promise<UserInfo> {
    if (!this._authToken) throw new Error('[Top.gg Votes] Missing token!');
    if (!userId) throw new Error('[Top.gg Votes] Missing user ID!');
    const API = new Api(this._authToken);
    const info = await API.getUser(userId);
    return info;
  }
}
