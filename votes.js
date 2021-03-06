const topSdk = require("@top-gg/sdk");
const express = require("express");
const chalk = require('chalk');

const app = express();

class Topgg {

    constructor(settings = {}) {
        this.settings = settings

        this.settings.port = this.settings.port ? this.settings.port : 22565;
        this.settings.auth = this.settings.auth ? this.settings.auth : "WEBHOOK";
        this.settings.token = this.settings.token;

        if (!this.settings.token || this.settings.token == undefined || this.settings.token == "") throw new Error("[Top.gg] Top.gg token is required!")
    }

    async postWebhook(client) {
        const webhook = new topSdk.Webhook(this.settings.auth);

        app.post("/dblwebhook", webhook.listener(vote => {
            if (vote.guild) {
                const user = vote.user;
                const guild = vote.guild;
                const isWeekend = vote.isWeekend;
                const query = "server";

                client.emit('newVote', user, guild, isWeekend, query);
            }
            else if (vote.bot) {
                const user = vote.user;
                const bot = vote.bot;
                const isWeekend = vote.isWeekend;
                const query = "bot";

                client.emit('newVote', user, bot, isWeekend, query);
            }
        }));

        app.listen(this.settings.port);
    }

    async checkVote(user) {
        let topApi = new topSdk.Api(this.settings.token, this);
        topApi.hasVoted(user).then(voted => {
            if (voted) {
                const vote = true;
            }
            if (!voted) {
                const vote = false;
            }
        })
    }

};

module.exports = Topgg;