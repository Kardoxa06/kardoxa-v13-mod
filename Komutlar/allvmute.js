const { MessageEmbed,Client,CommandInteraction } = require("discord.js");
const { kontrol } = require("../fonk.js")
const db = require("croxydb")
module.exports = {
    name:"herkesisustur",
    description: 'Kanalınızda bulunan herkesi susturur!',
    type:'CHAT_INPUT',
    category:"info",
    options:[], 
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {


        
        const channel = interaction.member.voice.channel;
        if(kontrol(interaction, 8) === 1) return
       
        if(!channel){
            interaction.reply({content: `Bu işlemi gerçekleştirmek için bir ses kanalında bulunmalısın!`, ephemeral: true})
            return;
        }
        
        if(db.fetch(`${channel.id}`) === "1"){
            interaction.reply(`**${channel.toString()}** Adlı ses kanalındaki üyelerin susturulmaları açılıyor!`).then(async msg => {

                let memberSize = channel.members.size;
                await new Promise(async (resolve) => {
    
                    let index = 0;
                    channel.members.forEach(async member => {
    
                        member.voice.setMute(false);
                        
                        
                    
                    });
                    interaction.channel.send({ content: ` **${channel.toString()}** Adlı ses kanalındaki **${memberSize}** üyenin başarıyla susturulması açıldı!`})
                    db.delete(`${channel.id}`)
                    });
        
                });
                return
            }
       
        interaction.reply(`**${channel.toString()}** Adlı ses kanalındaki üyeler susturulmaya başlandı!`).then(async msg => {

            let memberSize = channel.members.size;
            await new Promise(async (resolve) => {

                let index = 0;
                channel.members.forEach(async member => {

                    member.voice.setMute(true);
                    
                    
                
                });
                interaction.channel.send({ content: ` **${channel.toString()}** Adlı ses kanalındaki **${memberSize}** üye başarıyla susturuldu!`})
                db.set(`${channel.id}`, "1")
                });
            
            })



        
      
}
};