const { MessageEmbed,Client,CommandInteraction } = require("discord.js");
const { kontrol } = require("../fonk.js")
module.exports = {
    name:"herkesitaşı",
    description: 'Kanalınızda bulunan herkesi istediğiniz kanala taşırsınız!',
    type:'CHAT_INPUT',
    category:"info",
    options:[
        {
            name:"kanal",
            description:"Kullanıcıların taşınacağı kanalı seçin.",
            type: 7,
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
        const channel = options.getChannel("kanal") 
        const mChannel = interaction.member.voice.channel;
        if(kontrol(interaction, 8) === 1) return
        if(channel.type != "GUILD_VOICE")
        {
            interaction.reply({content: "Yalnızca ses kanallarını seçebilirsin!", ephemeral:true})
            return;
        }
        if(!mChannel){
            interaction.reply({content: `Bu işlemi gerçekleştirmek için bir ses kanalında bulunmalısın!`, ephemeral: true})
            return;
        }
        if(channel.userLimit !== 0 && mChannel.members.size > channel.userLimit) message.channel.send(`${cross} ${message.author} Belirttiğin kanalda yeterli yer yok!`)
        if(channel.id == mChannel.id) message.channel.send(`${cross} ${message.author} Zaten belirttiğin kanalda bulunuyorsun!`)

       
        interaction.reply(`**${mChannel.toString()}** Adlı ses kanalındaki üyeler **${channel.toString()}** adlı ses kanalına taşınmaya başlandı!`).then(async msg => {

            let memberSize = mChannel.members.size;
            await new Promise(async (resolve) => {

                let index = 0;
                mChannel.members.forEach(async member => {

                    member.voice.setChannel(channel.id);
                    
                    
                
                });
                interaction.channel.send({ content: ` **${mChannel.toString()}** Adlı ses kanalındaki **${memberSize}** üye başarıyla **${channel.toString()}** adlı ses kanalına taşındı!`})
                
                });
            
            })



        
      
}
};