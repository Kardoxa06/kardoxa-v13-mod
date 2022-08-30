const { MessageEmbed,Client,CommandInteraction } = require("discord.js");
const { kontrol, cpuan} = require("../fonk.js")
const veriler = require("../veriler.json")
const db = require("croxydb")
const moment = require("moment");
moment.locale("tr");
const ms = require("ms")
module.exports = {
    name:"sustur",
    description: 'Belirttiğiniz kullanıcıyı susturur!',
    type:'CHAT_INPUT',
    category:"info",
    options:[
        {
            name:"kullanıcı",
            description:"Susturulacak kullanıcıyı seçin.",
            type:6,
            required:true
        },
        {
            name:"süre",
            description:"Susturulma süresi nedir?",
            type:3,
            required:true
        },
        {
            name:"sebep",
            description:"Susturulma sebebi nedir?",
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
        const time = options.getString("süre") || "15m"

        if(kontrol(interaction, `"MUTE_MEMBERS"`) === 1) return
        
        
        if(member.id == client.user.id) {
            interaction.reply(`${interaction.member} Maalesef beni kullanarak beni susturamazsın!`)
            return
        }
        if(member.id == interaction.member.id) {
            interaction.reply(` ${interaction.member} Kendini mi susturacaksın? Bu şakaya bayıldım :)`) 
            return
        }
        if(!member.bannable) {
            interaction.reply(`${interaction.member} Maalesef belirtilen üyeyi susturamıyorum lütfen yetkimi ve koşulları kontrol et!`)
            return
        }
        
        
        db.add(`cezaid`, 1)
        member.roles.add(veriler.muted)
        db.push(`${db.fetch(`cezaid`)}`, `${interaction.member}     [**MUTE**]     \`${moment(Date.now()).format("LLL")}\`          ${member}`)
        db.push(`cezalar_${member.id}`, `${db.fetch(`cezaid`)}                  [**MUTE**]       \`${moment(Date.now()).format("LLL")}\`              ${interaction.member}`)
        interaction.reply(`**${member.user.tag}** kullanıcısı başarıyla **${time}** süresince **${sebep}** sebebi ile susturuldu!`)
        cpuan(interaction, "MUTE", "25", member)
        const log = client.channels.cache.get(veriler.banlog)
        const logger = new MessageEmbed()
        .setTitle(` Kullanıcı susturuldu!`)
        .setDescription(`Susturulan Kullanıcı: **${member.user.tag}**
        Susturan yetkili: **${interaction.member}** 
        Susturulma Tarihi: **${moment(Date.now()).format("LLL")}**
        Ceza ID: **${db.fetch(`cezaid`)}**
        Susturulma Sebebi: **${sebep}**
        `)
        .setTimestamp()
        .setFooter("Kardoxa! 💖")
        .setColor("RED")
        log.send({embeds: [logger]})
        setTimeout(function() {
        if(!member.roles.cache.has(veriler.muted)) return;
        member.roles.remove(veriler.muted);
        log.send(`${member} Kullanıcısının aldığı susturulma cezasının süresi bittiği için kaldırıldı!`)
        }, ms(time))
       
      
}
};