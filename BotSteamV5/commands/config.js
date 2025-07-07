
module.exports.run = async(client, message, args, Discord) => {
    message.delete();
    if (!message.member.hasPermission("ADMINISTRATOR")) return 

    const embed = new Discord.MessageEmbed()
    embed.setColor(process.env.COLOR)
    embed.setTitle(`Whitelist ${message.guild.name}`)
    embed.setDescription(`Bem-vindo ao servidor.\n\nPara iniciar sua whitelist digite \`\`\`!whitelist\`\`\`\ \n Fique atento as regras.`)
    embed.setThumbnail(message.guild.iconURL())
    embed.setFooter(`Desenvolvido por ${message.guild.name}`)
    client.channels.cache.get(process.env.channelWhitelist).send(embed) 

}