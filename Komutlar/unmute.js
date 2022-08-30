const { MessageEmbed,Client,CommandInteraction } = require("discord.js");
const { kontrol, cpuan} = require("../fonk.js")
const veriler = require("../veriler.json")
const db = require("croxydb")
const moment = require("moment");
moment.locale("tr");
module.exports = {
    name:"sustur-aç",
    description: 'Belirttiğiniz kullanıcının susturulmasını açar!',
    type:'CHAT_INPUT',
    category:"info",
    options:[
        {
            name:"kullanıcı",
            description:"Susturulması açılacak kullancıyı seçin.",
            type:6,
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
        const member = options.getMember("kullanıcı") 

        if(kontrol(interaction, 4) === 1) return
        
        if(!member.roles.cache.has(veriler.muted)){
            interaction.reply(`Belirtilen kullanıcının susturulma cezası bulunmuyor!`)
            return
        }
        
        
        if(!member.bannable){
            interaction.reply("Belirttiğin kullanıcının susturulmasını açamıyorum lütfen yetkimi ve koşulları kontrol et!")
            return
        }

        
        member.roles.remove(veriler.muted)
        interaction.reply(`**${member}** kullanıcının susturulması başarıyla açıldı!`)
        
      
}
};