const { MessageEmbed,Client,CommandInteraction } = require("discord.js");
const { kontrol, cpuan} = require("../fonk.js")
const veriler = require("../veriler.json")
const db = require("croxydb")
const moment = require("moment");
moment.locale("tr");
module.exports = {
    name:"kalıcı-yasakla",
    description: 'Belirttiğiniz kullanıcıyı kalıcı yasaklar!',
    type:'CHAT_INPUT',
    category:"info",
    options:[
        {
            name:"kullanıcı",
            description:"Yasaklanacak kullanıcıyı seçin.",
            type:6,
            required:true
        },
        {
            name:"sebep",
            description:"Yasaklanma sebebi nedir?",
            type:3,
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
        const member = options.getMember("kullanıcı") 
        const sebep = options.getString("sebep") || "Sebep belirtilmedi!"

        if(kontrol(interaction, 4) === 1) return
        
        
        if(member.id == client.user.id) {
            interaction.reply(`${interaction.member} Maalesef beni kullanarak beni yasaklayamazsın!`)
            return
        }
        if(member.id == interaction.member.id) {
            interaction.reply(` ${interaction.member} Kendini mi yasaklayacaksın? Bu şakaya bayıldım :)`) 
            return
        }
        if(!member.bannable) {
            interaction.reply(`${interaction.member} Maalesef belirtilen üyeyi yasaklayamıyorum lütfen yetkimi ve koşulları kontrol et!`)
            return
        }
        
        db.set(`force_${member.id}`, 1)
        db.add(`cezaid`, 1)
        member.ban({reason: `${interaction.user.tag} tarafından ${sebep} sebebi ile açılmaz ban cezası uygulandı!`})
        db.push(`${db.fetch(`cezaid`)}`, `${interaction.member}     [**FORCEBAN**]     \`${moment(Date.now()).format("LLL")}\`          ${member}`)
        db.push(`cezalar_${member.id}`, `${db.fetch(`cezaid`)}                  [**FORCEBAN**]       \`${moment(Date.now()).format("LLL")}\`              ${interaction.member}`)
        interaction.reply(`**${member.user.tag}** kullanıcısı başarıyla **${sebep}** sebebi ile kalıcı şekilde yasaklandı!`)
        cpuan(interaction, "FORCEBAN", "200", member)
        const log = client.channels.cache.get(veriler.banlog)
        const logger = new MessageEmbed()
        .setTitle(`Kullanıcı kalıcı şekilde yasaklandı!`)
        .setDescription(`Yasaklanan Kullanıcı: **${member.user.tag}**
        Yasaklayan yetkili: **${interaction.member}** 
        Yasaklanma Tarihi: **${moment(Date.now()).format("LLL")}**
        Ceza ID: **${db.fetch(`cezaid`)}**
        Yasaklanma Sebebi: **${sebep}**
        `)
        .setTimestamp()
        .setFooter("Kardoxa! 💖")
        .setColor("RED")
        log.send({embeds: [logger]})
      
}
};