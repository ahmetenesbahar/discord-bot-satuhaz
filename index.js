const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const fs = require("fs");
const client = new Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: 32767,
});

module.exports = client;

const config = require("./config.json");
const prefix = config.prefix;
const token = config.token;

client.on("ready", () => {
  console.log(`${client.user.tag} reis online!`);
  const actvs = [
    `${prefix}help | ${client.channels.cache.size} channels`,
    `${prefix}help | ${client.users.cache.size} users`,
    `${prefix}help | ${client.guilds.cache.size} servers`,
  ];

  client.user.setActivity(
    actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)],
    { type: "WATCHING" }
  );
  setInterval(() => {
    client.user.setActivity(
      actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)],
      { type: "WATCHING" }
    );
  }, 5000);

  client.user.setStatus("dnd");
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  msg = message.content.toLowerCase();
  if (msg.startsWith(prefix + "altın çocuk")) {
    message.channel.send("Muhammed Emin Beköz ?");
  }
  if (msg.startsWith(prefix + "mal")) {
    message.channel.send("Emre Özmen mi demek istediniz ?");
  }
  if (msg.startsWith(prefix + "allah")) {
    message.channel.send("efendim?");
  }
  if (msg.startsWith(prefix + "cihan")) {
    let monke = Math.floor(Math.random() * 4);
    if (monke === 1) {
      message.channel.send(":monkey_face:");
    }
    if (monke === 2) {
      message.channel.send(":speak_no_evil:");
    }
    if (monke === 3) {
      message.channel.send(":monkey:");
    }
  }
});

//new collections
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();

client.categories = fs.readdirSync("./commands");

//load the files

["command"].forEach((handler) => {
  require(`./handler/${handler}`)(client);
});
client.login(token);
