import { VoteClient } from './VoteClient';
import { Webhook } from '@top-gg/sdk';
import * as express from 'express';
import * as chalk from 'chalk';
import { VoteWebhookManagerOptions } from 'types';
import { VoteClientEvents } from '../util';

export class VoteWebhookManager {
  private _client: VoteClient;
  private _port: number;
  private _path: string;
  private _authorization: string;

  constructor(options: VoteWebhookManagerOptions) {
    this._client = options.client;
    this._port = options.port ?? 22565;
    this._path = options?.path || '/dblwebhook';
    this._authorization = options?.authorization || 'WEBHOOK';
  }

  public setPort(port: number | null): this {
    this._port = port ?? 22565;
    return this;
  }

  public setPath(path: string | null): this {
    this._path = path ?? '/dblwebhook';
    return this;
  }

  public startWebhookServer() {
    const webhook = new Webhook(this._authorization);
    const app = express();

    app.post(
      this._path,
      webhook.listener((vote) => {
        if (vote.bot) {
          this._client.emit(VoteClientEvents.BotVote, {
            userId: vote.user,
            botId: vote.bot,
            isWeekend: vote.isWeekend,
            type: vote.type,
          });
        }

        if (vote.guild) {
          this._client.emit(VoteClientEvents.ServerVote, {
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
}
