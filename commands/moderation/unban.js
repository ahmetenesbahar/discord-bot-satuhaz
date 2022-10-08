const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Unban a user from the server. ',
    run: async(client, message, args) => {
        if(!args[0]) return message.reply('**Please specify a banned user ID!**')

        if(!message.member.permissions.has('BAN_MEMBERS')) {
            const unbanError = new MessageEmbed()
            .setDescription('**You dont have permissions to ban.**')
            return message.channel.send({ embeds: [unbanError] })

        } else if(!message.guild.me.permissions.has('BAN_MEMBER')) {
            const unbanError1 = new MessageEmbed()
            .setDescription('**I dont have permissions to unban.**')
            return message.channel.send({ embeds: [unbanError1] })
        }

        try{
            let user = await message.guild.members.unban(args[0])
            let unbanSucces = new MessageEmbed()
            .setTitle(`${user.tag} was unbanned\nby ${message.author.tag}`)
            return message.channel.send({ embeds: [unbanSucces] })
        } catch {
            let errorEmbed = new MessageEmbed()
            .setDescription(":x: **I couldnt unban the user or the user is not banned**")
            return message.channel.send({ embeds: [errorEmbed] })
        }
    }
}