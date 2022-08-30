const fs = require("fs");
const {Client, Intents, MessageActionRow,MessageButton,MessageEmbed,Collection} = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const d = require("croxydb");
const client = new Client({
  fetchAllMembers: true,
  intents:[
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    
  ]});
const {token} = require("./ayarlar.json");


global.client = client;
client.commands = (global.commands = []);
fs.readdir("./Komutlar/", (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./Komutlar/${file}`);

        client.commands.push({
             name: props.name.toLowerCase(),
             description: props.description,
             options: props.options,
             category: props.category,
             
        })
        console.log(`\x1b[35m[ Kardoxa ] \x1b[32m» \x1b[31m${props.name} \x1b[32mKomutu aktif edildi!`);
    });
});

fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        
        console.log(`\x1b[35m[ Kardoxa ] \x1b[32m»\x1b[31m ${eventName} \x1b[32mEventi aktif edildi!\x1b[36m`);
        client.on(eventName, (...args) => {
           event(client, ...args);
        });
    });
});

client.on("ready", async () => {

    const rest = new REST({ version: "9" }).setToken(token);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: client.commands,
    });
  } catch (error) {
    console.error(error);
  }
});

client.on("guildMemberAdd", async member => {
  const db = require("croxydb")
  
  if(db.fetch(`force_${member.user.id}`)){
    member.ban({reason: "Daha önce kalıcı şekilde yasaklanmış! (Yasağını açmak için /kalıcı-yasak-aç)"})
  }

})




client.login("MTAxMjI2MDk2NjUxMzI0NjIxOA.Gw0EDZ.JXuMAH47TgMzxkGJEkNpS_m2leEoptmxVM--9s")