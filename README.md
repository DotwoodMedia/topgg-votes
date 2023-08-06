# Topgg-votes
Easily trade all your votes with this super easy framework!

[![downloadsBadge](https://img.shields.io/npm/dt/topgg-votes?style=for-the-badge)](https://npmjs.com/topgg-votes)
[![versionBadge](https://img.shields.io/npm/v/topgg-votes?style=for-the-badge)](https://npmjs.com/topgg-votes)

# 💻 Installation

1. Install module: `npm i topgg-votes`
2. Put the following in your index.ts:
```js
import { VoteClient, VoteClientEvents } from 'topgg-votes'

const votesClient = new VoteClient({
    token: "TOKEN",
    webhook: {
        port: 22565,
        path: "/dblwebhook",
        authorization: "WEBHOOK"
    }
})

// Event for vote notifications
votesClient.on(VoteClientEvents.BotVote, ({ userId }) => {
    console.log(`${userId} has voted!`)
})
```

# 📨 Check votes
```js
votesClient.hasVoted(interaction.user.id).then(voted => {
    if (voted) {
        console.log("User has voted!");
    }

    if (!voted) {
        console.log("User has not voted!");
    }
})
```

# 📂 Other examples
### Change client
```js
const votesClient = new VoteClient()
    .setToken("TOKEN") // Your top.gg token
    .setWebhookPort(22565) // Your host port
    .setWebhookPath("/dblwebhook") // Webhook path
    .setWebhookAuthorization("DOTWOODJS") // Webhook password
```

### New bot vote event
```js
votesClient.on(VoteClientEvents.BotVote, ({ userId, botId, isWeekend, type }) => {
    let embed = new Discord.EmbedBuilder()
        .setTitle(`New bot vote!!`)
        .addFields([
            {
                name: 'User',
                value: `<@!${userId}>`,
                inline: true
            },
            {
                name: 'Bot',
                value: `<@!${botId}>`,
                inline: true
            },
            {
                name: 'Weekend',
                value: `${isWeekend}`,
                inline: true
            },
            {
                name: 'Type',
                value: `${type}`,
                inline: true
            }
        ])
    client.channels.cache.get(ID).send({ embeds: [embed] });
    // Enter the ID of the logs channel at ID
})
```

### New server vote event
```js
votesClient.on(VoteClientEvents.ServerVote, ({ userId, guildId, type }) => {
    let embed = new Discord.EmbedBuilder()
        .setTitle(`New server vote!!`)
        .addFields([
            {
                name: 'User',
                value: `<@!${userId}>`,
                inline: true
            },
            {
                name: 'Guild',
                value: `<@!${guildId}>`,
                inline: true
            },
            {
                name: 'Type',
                value: `${type}`,
                inline: true
            }
        ])
    client.channels.cache.get(ID).send({ embeds: [embed] });
    // Enter the ID of the logs channel at ID
})
```

### Get votes
```js
votesClient.getVotes()
```

### Get bot
```js
votesClient.getBot(BOTID) // Replace BOTID with Discord bot id
```

### Get user
```js
votesClient.getUser(USERID) // Replace USERID with Discord user id
```

# 📑 License
This project has an <a href="https://github.com/DotwoodMedia/topgg-votes/blob/main/LICENSE">Apache 2.0</a> license
