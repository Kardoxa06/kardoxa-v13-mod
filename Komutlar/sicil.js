const { MessageEmbed,Client,CommandInteraction } = require("discord.js");
const { kontrol, cpuan} = require("../fonk.js")
const veriler = require("../veriler.json")
const db = require("croxydb")
const moment = require("moment");
moment.locale("tr");
module.exports = {
    name:"sicil",
    description: 'İstediğiniz kullanıcının sicilini sorgularsınız!',
    type:'CHAT_INPUT',
    category:"info",
    options:[
        {
            name:"kullanıcı",
            description:"Sicili gösterilecek kullanıcıyı seçin.",
            type:6,
            required:false
        },
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {

    
        const {guild, options} = interaction;
        const member = options.getMember("kullanıcı") || interaction.member

        const cezalar = db.get(`cezalar_${member.id}`) 

    if(!cezalar){
        interaction.reply(`Kullanıcıya ait sicil bilgisi bulunamadı!`)
        
        return
    }
    // if(!message.member.hasPermission("ADMINISTRATOR")){
    //     message.channel.send(`${cross} ${message.author} İşlemi gerçekleştirmek için gerekli yetkiye sahip değilsin!`)
    // }
    interaction.reply(`
    \`Ceza ID\`     \`Ceza Türü\`       \`Tarih\`                                               \`Yetkili\`
    ${cezalar.join("\n   ") }
    
    
    Kullanıcı toplam **${db.fetch(`${member.id}`)}** <a:coin:1014097511507570718> ceza puanına sahip!
    `)
}
};