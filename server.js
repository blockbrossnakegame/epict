let Discord = require("discord.js");
let client = new Discord.Client();
let { MessageEmbed } = require("discord.js");
const keep_alive = require('./keep_alive.js');
const express = require("express");
const app = express();
let snipedMessage = {};

app.listen(3000, () => {
  console.log("Epic troller is back.");
})

app.get("/", (req, res) => {
  res.send(`epic-bot`);
})

app.get("/2", (req, res) => {
  res.send(`epic-bot`);
})

client.on("ready", () => {
  client.user.setActivity(".help | The Nucks", { type: "PLAYING" });
});

client.on("messageDelete", (deletedMessage) => {
  if (!deletedMessage.author.bot) {
    snipedMessage[deletedMessage.channel.id] = {
      content: deletedMessage.content,
      author: deletedMessage.author.tag,
      timestamp: deletedMessage.createdTimestamp
    };
  }
});

client.on("message", async (message) => {
  if (message.author.bot) {
  } else {
    const command = message.content.toLowerCase()
    let role = message.guild.roles.cache.find((role) => role.id === "1218291136700088421");
    if (role) {
      message.member.roles.add(role);
    }
    
    // Everyone
    if (command.startsWith(".help") || command.startsWith(".commands") || command.startsWith(".cmds")) {
      const embed = new MessageEmbed()
      .setTitle(`**The Nucks Help Guide**`)
      .setDescription(`Here can you view all **The Nucks commands**
**Available to everyone**
**.help** - The command u just used lol. (Available in dms)
**.8ball** - Answers your questions. (Available in dms)
**.flipcoin** - Just flipping a coin. (Available in dms)
**.snipe** - Sends the most recent deleted message.

**Available to moderators**
**.kick**- Kicks a player from the server.
**.ban**- Bans a player from the server.
[Community Server](https://discord.gg/ETed2UzY5W)`)
      .setImage('https://www.models-resource.com/resources/big_icons/8/7939.png?updated=1409425533')
      .setColor("#FF0000");
      if (message.channel.type === 'dm') {
        message.author.send(embed)
      } else {
        message.channel.send(embed)
      }
      message.channel.send(embed)
      let channel = client.channels.cache.get("1218590780495757393");
      channel.send(`${message.author.tag} used .help`);
    }
    
    if (command.startsWith(".wdsawdsawdsa")) {
      const embed = new MessageEmbed()
      .setTitle(`**The Nucks Server Rules**`)
      .setDescription(`1. No Inappropriate topics, images, video's and links.
2. You are allowed to swear but dont use really REALLY bad swear words.
3. No racist stuff.
4. Do not harrass people.

Just don't break these rules and be smart, thanks.
**The Nucks** is being currently being used in **${client.guilds.cache.size}** server.
[Community Server](https://discord.gg/ETed2UzY5W)`)
      .setImage('https://www.models-resource.com/resources/big_icons/8/7939.png?updated=1409425533')
      .setColor("#FF0000");
      if (message.channel.type === 'dm') {
        message.author.send(embed)
      } else {
        message.channel.send(embed)
      }
      message.channel.send(embed)
      let channel = client.channels.cache.get("1218590780495757393");
      channel.send(`${message.author.tag} used .help`);
    }
    
    if (command.startsWith(".8ball")) {
      let nicknames = ["🎱 yes", "🎱 no", "🎱 yes", "🎱no", "🎱idk why do you ask me?", "🎱zzzzzzzz"]
      if (message.channel.type === 'dm') {
        message.author.send(`${nicknames[Math.floor(Math.random() * nicknames.length)]}`);
      } else {
        message.channel.send(`${nicknames[Math.floor(Math.random() * nicknames.length)]}`);
      }
      let channel = client.channels.cache.get("1218590780495757393");
      channel.send(`${message.author.tag} used .8ball`);
    }

    if (command.startsWith(".flipcoin")) {
      const result = Math.random() < 0.5 ? "Heads 🧑‍🦲" : "Tails <:Tails:1227987501692620921>";
      message.channel.send(`🪙 you flipped **${result}**`);
      if (message.channel.type === 'dm') {
         message.author.send(`🪙 you flipped **${result}**`);
      } else {
        message.channel.send(`🪙 you flipped **${result}**`);
      }
      let channel = client.channels.cache.get("1218590780495757393");
      channel.send(`${message.author.tag} used .flipcoin`);
    }
    
    if (command.startsWith(".snipe")) {
    const channelId = message.channel.id;
    const snipedMsg = snipedMessage[channelId];
      if (snipedMsg) {
        const { content, author, timestamp } = snipedMsg;
        const time = new Date(timestamp).toLocaleString();
        const snipeEmbed = new MessageEmbed()
        .setTitle(`Sniped Message in #${message.channel.name}`)
        .setDescription(`**User:** ${author.username}\n**Content:** ${content}\n**Time:** ${time}`)
        .setColor("#FF0000");
        message.channel.send(snipeEmbed);
      } else {
        message.channel.send("<:NucksDeclined:1218624990505603143> There are no recently deleted messages to snipe.");
      }
      let channel = client.channels.cache.get("1218590780495757393");
      channel.send(`${message.author.tag} used .snipe`);
    }

    // Mods
    if (command.startsWith(".kick")) {
      if (message.member.hasPermission('KICK_MEMBERS')) {
        const mention = message.mentions.members.first();
        if (mention) {
          mention.kick()
          .then(member => {
            message.channel.send(`<:NucksApproved:1218625043853213706> ${mention} has been kicked.`);
          })
          .catch(error => {
             message.channel.send(`<:NucksDeclined:1218624990505603143> Kicking has failed. Reason: user can not be kicked`);
          });
        } else {
          message.channel.send("<:NucksDeclined:1218624990505603143> Kicking has failed. Reason: You didn't @ someone");
        }
      }
      let channel = client.channels.cache.get("1218590780495757393");
      channel.send(`${message.author.tag} used .kick`);
    }
    
    if (command.startsWith(".ban")) {
      if (message.member.hasPermission('BAN_MEMBERS')) {
        const mention = message.mentions.members.first();
        if (mention) {
          mention.ban()
          .then(member => {
            message.channel.send(`<:NucksApproved:1218625043853213706> ${mention} has been banned.`);
          })
          .catch(error => {
             message.channel.send(`<:NucksDeclined:1218624990505603143> Banning has failed. Reason: user can not be kicked`);
          });
        } else {
          message.channel.send("<:NucksDeclined:1218624990505603143> Banning has failed. Reason: You didn't @ someone");
        }
      }
      let channel = client.channels.cache.get("1218590780495757393");
      channel.send(`${message.author.tag} used .ban`);
    }
  }
})

client.login(process.env.token);
