# Topgg-votes
Easily trade all your votes with this super easy framework!

[![downloadsBadge](https://img.shields.io/npm/dt/topgg-votes?style=for-the-badge)](https://npmjs.com/topgg-votes)
[![versionBadge](https://img.shields.io/npm/v/topgg-votes?style=for-the-badge)](https://npmjs.com/topgg-votes)

# 💻 Installation

1. Install module: `npm i topgg-votes`
2. Put the following in your index.js:
```
const { Topgg } = require("topgg-votes");

client.topgg = new Topgg({
    token: "TOKEN", // Your top.gg token
    port: 22565, // Your host port
    auth: "WEBHOOK" // Webhook password
})

client.topgg.postWebhook(client);

// Event for vote notifications
// Options: user, bot, type, isWeekend
client.on("newVote", user => {
    console.log(`${user} has voted!`)
})
```

# 📨 Check votes
```
client.topgg.checkVote(message.author.id).then(vote => {
    if (vote) {
        console.log("User has voted!");
    }

    if (!vote) {
        console.log("User has not voted!");
    }
})
```

# 📂 Examples
- New vote event
```
client.on("newVote", (user, bot, isWeekend) => {
    let embed = new Discord.MessageEmbed()
        .setTitle(`New vote!!`)
        .addField("User", `<@!${user}>`, true)
        .addField("Bot", `<@!${bot}>`, true)
        .addField("Weekend", isWeekend, true)
    client.channels.cache.get(ID).send(embed);
})
```

# 📑 License
This project has an <a href="https://github.com/DotwoodMedia/topgg-votes/blob/main/LICENSE">Apache 2.0</a> license