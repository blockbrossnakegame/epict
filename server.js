let Discord = require("discord.js");
let client = new Discord.Client();
let { MessageEmbed } = require("discord.js");
const express = require("express");
const keep_alive = require('./keep_alive.js');
const app = express();

app.listen(3000, () => {
  console.log("Epic troller is back.");
})

client.on("ready", () => {
  client.user.setActivity(" | I'm back 🥳", { type: "PLAYING" });
});

client.on("message", async (message) => {
  if (message.author.bot) {
  } else {
    
  }
})
