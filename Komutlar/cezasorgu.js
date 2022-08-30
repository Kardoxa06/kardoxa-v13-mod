const { MessageEmbed,Client,CommandInteraction } = require("discord.js");
const { kontrol, cpuan} = require("../fonk.js")
const veriler = require("../veriler.json")
const db = require("croxydb")
const moment = require("moment");
moment.locale("tr");
module.exports = {
    name:"cezasorgu",
    description: 'Belirttiğiniz id numaralı cezayı sorgular!',
    type:'CHAT_INPUT',
    category:"info",
    options:[
        {
            name:"id",
            description:"İncelemek istediğiniz ceza numarasını seçin.",
            type:4,
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
        const id = options.getInteger("id") 
        

        if(kontrol(interaction, 8) === 1) return
        
        
        const cezalar = db.get(`${id}`) 
        

        if(!cezalar){
            interaction.reply({content: `ID numarasına ait ceza verisi bulunamadı!`})
            return
        }
        interaction.reply(`
        \`Yetkili\`        \`Ceza Türü\`               \`Tarih\`                                   \`Kullanıcı\`
${cezalar.join("\n   ") }





`)
      
}
};