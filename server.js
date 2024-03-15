let Discord = require("discord.js");
let client = new Discord.Client();
let { MessageEmbed } = require("discord.js");
const express = require("express");
const app = express();

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
**.snipe** - Sends the most recent deleted message.

**Available to moderators**
**.kick**- Kicks a player from the server
**.ban**- Bans a player from the server
`)
      .setColor("#ffffff");
      message.channel.send(embed)
    }
    
    if (command.startsWith("!8ball")) {
      if (command.match("is bruinebies a femboy") || command.match("is bruinebies femboy")) {
        let nicknames = ["🎱no", "🎱no, you idiot", "🎱too lazy to answer"]
        message.channel.send(`${nicknames[Math.floor(Math.random() * nicknames.length)]}`);
      } else {
        let nicknames = ["🎱 yes", "🎱 no", "🎱 yes r u that dumb?", "🎱no, you idiot", "🎱idk why do you ask me?", "🎱too lazy to answer"]
        message.channel.send(`${nicknames[Math.floor(Math.random() * nicknames.length)]}`);
      }
    }
    if (command.startsWith(".snipe")) {
    const channelId = message.channel.id;
    const snipedMsg = snipedMessage[channelId];
    if (snipedMsg) {
        const { content, author, timestamp } = snipedMsg;
        const time = new Date(timestamp).toLocaleString();
        const snipeEmbed = new MessageEmbed()
        .setTitle(`Sniped Message in ${message.channel.name}`)
        .setDescription(`**User:** ${author}\n**Content:** ${content}\n**Time:** ${time}`)
        .setColor("#ffffff");
        message.channel.send(snipeEmbed);
      } else {
        message.channel.send("There are no recently deleted messages to snipe.");
      }
    }

    // Mods
    if (command.startsWith(".kick")) {
      if (message.member.hasPermission('KICK_MEMBERS')) {
        const mention = message.mentions.members.first();
        if (mention) {
          mention.kick()
          .then(member => {
            message.channel.send(`${mention} has been kicked L`);
          })
          .catch(error => {
             message.channel.send(`Kicking has failed :(`);
          });
        } else {
          message.channel.send("You have to @ someone to kick them");
        }
      }
    }
    
    if (command.startsWith(".ban")) {
      if (message.member.hasPermission('BAN_MEMBERS')) {
        const mention = message.mentions.members.first();
        if (mention) {
          mention.ban()
          .then(member => {
            message.channel.send(`${mention} has been banned L`);
          })
          .catch(error => {
             message.channel.send(`Banning has failed :(`);
          });
        } else {
          message.channel.send("You have to @ someone to ban them");
        }
      }
    }
  }
})

client.login(process.env.token);
