import { VoteWebhookManagerOptions } from '~/types/VoteWebhookManagerOptions';
import { VoteClient } from './VoteClient';
import { Webhook } from '@top-gg/sdk';
import * as express from 'express';
import * as chalk from 'chalk';
import { VoteClientEvents } from '~/util/VoteClientEvents';

export class VoteWebhookManager {
  private _client: VoteClient;
  private _port: number;
  private _path: string;

  constructor(options: VoteWebhookManagerOptions) {
    this._client = options.client;
    this._port = options.port ?? 22565;
    this._path = options?.path || '/dblwebhook';
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
    const webhook = new Webhook(this._client.getAuthorization());
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
