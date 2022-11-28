import * as express from 'express';
import { Webhook, Api } from '@top-gg/sdk';
import { EventEmitter } from 'events';

export interface IVoteClientConfig {
    token: string;
    port?: number;
    authorization?: string;
}

export class VoteClient extends EventEmitter {
    private _authToken: string;
    private _port: number;
    private _authorization: string;

    constructor(config: IVoteClientConfig) {
        super();
        this._authToken = config.token;
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
        const webhook = new Webhook(this._authorization);
        const app = express();

        app.post('/dblwebhook', webhook.listener(vote => {
            if (vote.bot) {
                this.emit('botVote', {
                    userId: vote.user,
                    botId: vote.bot,
                    isWeekend: vote.isWeekend,
                    type: vote.type
                })
            }
            if (vote.guild) {
                this.emit('serverVote', {
                    userId: vote.user,
                    guildId: vote.guild,
                    type: vote.type
                })
            }
        }))

        app.listen(this._port);
    }

    public async hasVoted(userId: string): Promise<boolean> {
        const API = new Api(this._authToken);
        const voted = await API.hasVoted(userId);
        return voted;
    }
}