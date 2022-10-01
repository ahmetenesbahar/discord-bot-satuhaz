const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban a user from the server. ',
    run: async(client, message, args) => {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
        const reason = args.slice(1).join(' ')

        if(!mentionedMember) return message.reply('**Please specify a member!**')

        if(!message.member.permissions.has('BAN_MEMBERS')) {
            const banError = new MessageEmbed()
            .setDescription('**You dont have permissions to ban.**')
            return message.channel.send({ embeds: [banError] })

        } else if(!message.guild.me.permissions.has('BAN_MEMBER')) {
            const banError1 = new MessageEmbed()
            .setDescription('**I dont have permissions to ban.**')
            return message.channel.send({ embeds: [banError1] })
        }

        const mentionedPosition = mentionedMember.roles.highest.position
        const memberPosition = message.member.roles.highest.position
        const botPosition = message.guild.me.roles.highest.position

        if(memberPosition <= mentionedPosition) {
            const banErr = new MessageEmbed()
            .setDescription('**You cannot ban this member because thier role is higher/equal to yours!**')
            return message.channel.send({ embeds: [banErr] })
        } else if (botPosition <= mentionedPosition) {
            const banErr1 = new MessageEmbed()
            .setDescription('**I cannot ban this member because thier role is higher/equal to mine!**')
            message.channel.send({ embeds: [banErr1] })
        }

        try{
            const reasonDm = new MessageEmbed()
            .setTitle(`You were banned by ${message.author.tag}!`)
            .setDescription(`Reason: ${reason}`)
            await mentionedMember.send({ embeds: [reasonDm] })
            await mentionedMember.ban({ reason: reason }).then(() => {

                const banSucess = new MessageEmbed()
                .setTitle(`${mentionedMember.user.tag} was banned\nby ${message.author.tag}`)
                .setDescription(`Reason: ${reason}`)
                message.channel.send({ embeds: [banSucess] })
            })

        } catch (error) {
            const errorEmbed = new MessageEmbed()
            .setDescription(':x: **There was an error while banning this user!**')
            return message.channel.send({ embeds: [errorEmbed] })
        }
    }
}