require("dotenv").config();//Loading .env
const fs = require("fs");
const { Collection, Client } = require("discord.js");
const { keep_alive } = require("./keep_alive");
const client = new Client();//Making a discord bot client
client.commands = new Collection();//Making client.commands as a Discord.js Collection
client.queue = new Map()
client.config = {
  prefix: process.env.PREFIX
}

//Loading Events
fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Loading Event: "+eventName)
  });
});

//Loading Commands
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: "+commandName)
  });
});

//Logging in to discord
client.login(process.env.TOKEN)



process.on('multipleResolves', (type, reason, promise) => {
  console.log(`🚫 Erro Detectado\n\n` + type, promise, reason)
});
process.on('unhandRejection', (reason, promise) => {
  console.log(`🚫 Erro Detectado:\n\n` + reason, promise)
});
process.on('uncaughtException', (error, origin) => {
 console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});