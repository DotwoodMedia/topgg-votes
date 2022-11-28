# Topgg-votes
Easily trade all your votes with this super easy framework!

[![downloadsBadge](https://img.shields.io/npm/dt/topgg-votes?style=for-the-badge)](https://npmjs.com/topgg-votes)
[![versionBadge](https://img.shields.io/npm/v/topgg-votes?style=for-the-badge)](https://npmjs.com/topgg-votes)

# 💻 Installation

1. Install module: `npm i topgg-votes`
2. Put the following in your index.ts:
```
import { VoteClient } from 'topgg-votes'

const votesClient = new VoteClient({
    token: "TOKEN", // OPTIONAL only required for getVotes, hasVoted, getBot and getUser
    port: 22565, // OPTIONAL default is 22565
    auth: "WEBHOOK" // OPTIONAL only required at postWebhook
})

votesClient.postWebhook();

// Event for vote notifications
votesClient.on("botVote", ({ userId }) => {
    console.log(`${userId} has voted!`)
})
```

# 📨 Check votes
```
votesClient.hasVoted(interaction.user.id).then(voted => {
    if (voted) {
        console.log("User has voted!");
    }

    if (!voted) {
        console.log("User has not voted!");
    }
})
```

# 📂 Examples
- New bot vote event
```
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

- New server vote event
```
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

# 📑 License
This project has an <a href="https://github.com/DotwoodMedia/topgg-votes/blob/main/LICENSE">Apache 2.0</a> license