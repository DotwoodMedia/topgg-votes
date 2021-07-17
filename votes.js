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
            if (req.vote.guild) {
                const user = req.vote.user;
                const guild = req.vote.guild;
                const isWeekend = req.vote.isWeekend;
                const query = "server";

                client.emit('newVote', user, guild, isWeekend, query);
            }
            else if (req.vote.bot) {
                const user = req.vote.user;
                const bot = req.vote.bot;
                const isWeekend = req.vote.isWeekend;
                const query = "bot";

                client.emit('newVote', user, bot, isWeekend, query);
            }
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