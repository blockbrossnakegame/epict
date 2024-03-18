let Discord = require("discord.js");
let client = new Discord.Client();
let { MessageEmbed } = require("discord.js");
const express = require("express");
const app = express();
let snipedMessage = {};

app.listen(3000, () => {
  console.log("Epic troller is back.");
})

client.on("ready", () => {
  client.user.setActivity(".help | EPICT", { type: "PLAYING" });
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
      .setTitle(`**Epic Troller Help Guide**`)
      .setDescription(`Here can you view all **epic troller commands**
**Available to everyone**
**.help** - The command u just used lol.
**.8ball** - Answers your questions.
**.flipcoin** - Just flipping a coin.
**.snipe** - Sends the most recent deleted message.

**Available to moderators**
**.kick**- Kicks a player from the server.
**.ban**- Bans a player from the server.
`)
      .setColor("#ffffff");
      message.channel.send(embed)
      let channel = client.channels.cache.get("1218590780495757393");
      channel.send(`${message.author.tag} used .help`);
    }
    
    if (command.startsWith(".8ball")) {
      if (command.match("is bruinebies a femboy") || command.match("is bruinebies femboy")) {
        let nicknames = ["🎱no", "🎱no, you idiot", "🎱too lazy to answer"]
        message.channel.send(`${nicknames[Math.floor(Math.random() * nicknames.length)]}`);
      } else {
        let nicknames = ["🎱 yes", "🎱 no", "🎱 yes r u that dumb?", "🎱no, you idiot", "🎱idk why do you ask me?", "🎱too lazy to answer"]
        message.channel.send(`${nicknames[Math.floor(Math.random() * nicknames.length)]}`);
      }
      channel.send(`${message.author.tag} used .8ball`);
    }

    if (command.startsWith(".flipcoin")) {
      const result = Math.random() < 0.5 ? "Heads 🧑‍🦲" : "Tails <:tails:1219366122764107926>";
      message.channel.send(`🪙 you flipped **${result}**`);
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
        .setDescription(`**User:** ${author}\n**Content:** ${content}\n**Time:** ${time}\nYour message got SNIPED <:sniper:1218626785646874665><:sniper:1218626785646874665><:sniper:1218626785646874665>`)
        .setColor("#ffffff");
        message.channel.send(snipeEmbed);
      } else {
        message.channel.send("<:EpicTrollerDeclined:1218624990505603143> There are no recently deleted messages to snipe.");
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
            message.channel.send(`<:EpicTrollerApproved:1218625043853213706> ${mention} has been kicked.`);
          })
          .catch(error => {
             message.channel.send(`<:EpicTrollerDeclined:1218624990505603143> Kicking has failed. Reason: user can not be kicked`);
          });
        } else {
          message.channel.send("<:EpicTrollerDeclined:1218624990505603143> Kicking has failed. Reason: You didn't @ someone");
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
            message.channel.send(`<:EpicTrollerApproved:1218625043853213706> ${mention} has been banned.`);
          })
          .catch(error => {
             message.channel.send(`<:EpicTrollerDeclined:1218624990505603143> Banning has failed. Reason: user can not be kicked`);
          });
        } else {
          message.channel.send("<:EpicTrollerDeclined:1218624990505603143> Banning has failed. Reason: You didn't @ someone");
        }
      }
      let channel = client.channels.cache.get("1218590780495757393");
      channel.send(`${message.author.tag} used .ban`);
    }
  }
})

client.login(process.env.token);
