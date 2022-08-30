const {CLient, CommandInteraction, ButtonInteraction, MessageEmbed, MessageButton, MessageActionRow} = require("discord.js");
const fs = require("fs");
const d = require("croxydb");

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 * @param {ButtonInteraction} button
 */
module.exports = async (client, interaction, button) => {
    if (interaction.isCommand()){
    try {
      fs.readdir("./Komutlar/", (err, files) => {
        if (err) throw err;

        files.forEach(async (f) => {
          const command = require(`../Komutlar/${f}`);
          if (
            interaction.commandName.toLowerCase() === command.name.toLowerCase()
          ) {
            return command.run(client, interaction);
          }
        });
      });
    } catch (err) {
      console.error(err);
    }
  }
   
};

