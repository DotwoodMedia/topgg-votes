# Topgg-votes
Easily trade all your votes with this super easy framework!

[![downloadsBadge](https://img.shields.io/npm/dt/topgg-votes?style=for-the-badge)](https://npmjs.com/topgg-votes)
[![versionBadge](https://img.shields.io/npm/v/topgg-votes?style=for-the-badge)](https://npmjs.com/topgg-votes)

# 💻 Installation

1. Install module: `npm i topgg-votes`
2. Put the following in your index.ts:
```js
import { VoteClient } from 'topgg-votes'

const votesClient = new VoteClient()
votesClient.postWebhook();

// Event for vote notifications
votesClient.on("botVote", ({ userId }) => {
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
    .setPort(22565) // Your host port
    .setAuthorization("WEBHOOK") // Webhook password
```

### New bot vote event
```js
client.on("botVote", ({ userId, botId, isWeekend, type }) => {
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
client.on("botVote", ({ userId, guildId, type }) => {
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

### New server vote event
```js
client.on("botVote", ({ userId, guildId, type }) => {
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
client.getVotes()
```

### Get bot
```js
client.getBot(BOTID) // Replace BOTID with Discord bot id
```

### Get user
```js
client.getUser(USERID) // Replace USERID with Discord user id
```

# 📑 License
This project has an <a href="https://github.com/DotwoodMedia/topgg-votes/blob/main/LICENSE">Apache 2.0</a> license
