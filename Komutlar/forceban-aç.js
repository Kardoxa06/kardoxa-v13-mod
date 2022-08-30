const { MessageEmbed,Client,CommandInteraction } = require("discord.js");
const { kontrol, cpuan} = require("../fonk.js")
const veriler = require("../veriler.json")
const db = require("croxydb")
const moment = require("moment");
moment.locale("tr");
module.exports = {
    name:"kalıcı-yasak-aç",
    description: 'Belirttiğiniz idye sahip kullanıcının kalıcı yasağını açar!',
    type:'CHAT_INPUT',
    category:"info",
    options:[
        {
            name:"kullanıcı",
            description:"Yasağı açılacak kullanıcının idsini girin.",
            type:3,
            required:true
        },
       
    ], 
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        const {guild, options} = interaction;
        const member = options.getString("kullanıcı") 

        if(kontrol(interaction, 4) === 1) return
        
        const mem2 = interaction.guild.members.cache.get(member)
        if(mem2){
            interaction.reply("Belirttiğin ID zaten sunucuda yasaklı değil!")
            return
        }
        
        
        if(!db.fetch(`force_${member}`)){
            interaction.reply("Belirttiğin ID zaten kalıcı yasaklanma cezasına sahip değil!")
            return
        }

        
        guild.bans.remove(member)
        db.delete(`force_${member}`)
        interaction.reply(`**${member}** id numaralı kullanıcının kalıcı yasaklanması başarıyla açıldı!`)
        
      
}
};