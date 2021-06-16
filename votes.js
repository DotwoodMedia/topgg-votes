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

        if(!this.settings.token || this.settings.token == undefined || this.settings.token == "") {
            return console.log(chalk.red(chalk.bold("[Top.gg]") + " Top.gg token is required!"))
        }
    }

    async postWebhook(client) {
        const webhook = new topSdk.Webhook(this.settings.auth);

        app.post("/dblwebhook", webhook.middleware(), async (req, res) => {
            const user = req.vote.user;
            const bot = req.vote.bot;
            const type = req.vote.type;
            const isWeekend = req.vote.isWeekend;

            client.emit('newVote', user, bot, type, isWeekend);
        });
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