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

        let argsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> ${author} You need to use 3 Arguments! Example **^kick @person [reason]**`)
        let channel = message.channel
        let permsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> You can't use that ${message.author.username}!`)
            .addField("Error", 'Missing `KICK_MEMBERS`')
            .setColor("RANDOM")
        let log_channel = message.guild.channels.cache.get('780815502997454848');
        if (!args[1]) return message.channel.send(argsembed);
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply(permsembed);
        if (message.channel instanceof Discord.DMChannel) return;
        if (message.author.bot) return;



        const user = message.mentions.users.first();

        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member.kick(msgArgs).then(() => {
                    const embed = new MessageEmbed()
                        .setColor('#229954')
                        .setDescription(`<:STT_yes:778545433810173952> STT Premium kicked ${member} Reason:` + " " + "**" + msgArgs + "**")
                        .setTimestamp()
                    message.reply(embed);
                    //let logembed = new MessageEmbed()
                    // .setColor("RANDOM")
                    //.setDescription(`**KICK** | ${member}`)
                    //.addField(`Moderator:`, `${author}`)
                    //.addField(`Channel: `, `${channel}`)
                    //.addField(`Reason:`, msgArgs)
                    //.setThumbnail(message.author.displayAvatarURL())
                    //.setTimestamp()
                    //log_channel.send(logembed);
                    console.log(`I kicked ${user.tag}. Provided Reason:` + msgArgs);
                    message.delete();







                }).catch(err => {
                        const embed = new MessageEmbed()
                            .setColor('#F1C40F')
                            .setDescription('<:STT_no:778545452218974209> The bot was unable to kick this Person.It is missing Permissions:`ADMINISTRATOR,KICK_MEMBERS` ')
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