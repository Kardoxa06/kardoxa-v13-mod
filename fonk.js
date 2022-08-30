const { delByPriority } = require("croxydb")
const { MessageEmbed } = require("discord.js")
const veriler = require("./veriler.json")

exports.kontrol = function(interaction, y) {

    if(!interaction.member.permissions.has(y) || !interaction.member.id === "583288613886754816"){
        const yetkinyok = new MessageEmbed()
        .setTitle("Gerekli yetkiye sahip değilsin!")
        .setDescription(`Bu işlemi gerçekleştirmek için gerekli yetkiye sahip değilsin!`)
        .setColor("RED")
        .setFooter({text: "Kardoxa! 💖"})
        .setTimestamp()
        interaction.reply({embeds: [yetkinyok], ephemeral: true})

        return(1)

    }


   
}

exports.cpuan = function(interaction, c, p, m) {
    const k = interaction.guild.channels.cache.get(veriler.cpuanlog)
    const db = require("croxydb")
    db.add(`${m.id}`, p)
    if(c == "BAN") m = m.user.tag

    const ceza = new MessageEmbed()
        .setTitle("Ceza işlemi!")
        .setDescription(`**${m}** kullanıcısına aldığı **${c}** cezası sebebiyle **${p}** ceza puanı ekledim! `)
        .setColor("RED")
        .setFooter({text: "Kardoxa! 💖"})
        .setTimestamp()
        k.send({embeds: [ceza], ephemeral: false})
        


   
}