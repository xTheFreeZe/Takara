const {
    MessageEmbed
} = require('discord.js');
const Discord = require('discord.js');
module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kicks a Member from a Guild",
    run: async (client, message, PREFIX) => {
        let args = message.content.substring(PREFIX.length).split(" ");
        let msgArgs = args.slice(2).join(" ");
        let author = message.author
        const user = message.mentions.users.first();
        const member = message.guild.member(user);
        const log_channel = message.guild.channels.cache.find(r => r.name === 'logs');
        const STTPremium = client.users.cache.get('749889822214324236')

        let argsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> ${message.author.username} please mention someone to kick and provide a reason.`)
        let channel = message.channel

        let permsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> You can't use that ${message.author.username}!`)
            .addField("Error", 'Missing `KICK_MEMBERS`')
            .setColor("RANDOM")

        const selfkickembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> You can't kick yourself!")
            .setColor("RANDOM")

        const reembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> Please provide a reason!")
            .setColor("RANDOM")

        const nologembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> Please create a channel called `logs` before using this command!")
            .setColor("RANDOM")

        const STTbanembed = new MessageEmbed()
            .setDescription('<:STT_no:778545452218974209> You can not ban the Bot with this command!')
            .setColor('RED')

        if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply(permsembed);
        if (!log_channel) return message.channel.send(nologembed);
        if (!args[1]) return message.channel.send(argsembed);
        if (message.channel instanceof Discord.DMChannel) return;
        if (message.author.bot) return;
        if (!msgArgs) return message.channel.send(reembed), message.delete();
        if (user == message.author) return message.channel.send(selfkickembed);
        if (user = STTPremium) return message.channel.send(STTbanembed);

        if (user) {
            if (member) {
                member.kick(msgArgs + " " + `|| Moderator : ${message.author.tag}`).then(() => {
                    const embed = new MessageEmbed()
                        .setColor('#229954')
                        .setDescription(`<:STT_yes:778545433810173952> STT Premium kicked ${member} Reason:` + " " + "**" + msgArgs + "**")
                        .setTimestamp()
                        .setFooter('STT Premium | Moderation')
                    message.reply(embed);


                    const DMembed = new MessageEmbed()
                        .setDescription("<:STT_yes:778545433810173952> You have been kicked!")
                        .addField('Server :', `${message.guild}`)
                        .addField('Reason :', msgArgs)
                        .setTimestamp()
                        .setColor("RANDOM")

                    member.send(DMembed);

                    const logembed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`KICK || ${user.tag}`)
                        .addField('Moderator', `${message.author.tag}`)
                        .addField('Channel', `${message.channel}`)
                        .addField('Reason', msgArgs)
                        .setTimestamp()

                    log_channel.send(logembed);

                    console.log(`I kicked ${user.tag}. Provided Reason:` + msgArgs);
                    message.delete();







                }).catch(err => {
                        const embed = new MessageEmbed()
                            .setColor('#F1C40F')
                            .setDescription('<:STT_no:778545452218974209> The bot was unable to kick this Person. Missing Permissions:`ADMINISTRATOR,KICK_MEMBERS` ')
                            .addField('Error:', 'The bot is missing Permissions')
                        message.reply(embed);
                        message.delete();

                        console.log(err);



                    }

                )



            } else {
                message.reply("That user isnt  on the Server")

            }
        } else {
            const embed = new MessageEmbed()
                .setColor('#3F2DD2 ')
                .setDescription('You need to specify a Person! You need to use ^kick @[member]. Make sure I have the right Permissions to kick someone!')
            message.channel.send(embed);
            message.delete();


        }




    }
}