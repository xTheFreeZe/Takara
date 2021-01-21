const {
    MessageEmbed
} = require('discord.js');
const Discord = require('discord.js');
module.exports = {
    name: "ban",
    category: "moderation",
    description: "Bans a Member from a Guild",

    run: async (client, message, PREFIX) => {
        let args = message.content.substring(PREFIX.length).split(" ");
        let msgArgs = args.slice(2).join(" ");
        let author = message.author
        let argsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> ${message.author.username} please mention someone to ban and (optional) provide a reason. `)
            .setColor("RANDOM")
        let channel = message.channel
        let permsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> You can't use that ${message.author.username}!`)
            .addField("Error", 'Missing `BAN_MEMBERS`')
            .setColor("RANDOM")
        let log_channel = message.guild.channels.cache.get('780815502997454848');
        if (!args[1]) return message.channel.send(argsembed);
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply(permsembed);
        if (message.channel instanceof Discord.DMChannel) return;
        if (message.author.bot) return;
        const user = args[1]



        const member = message.mentions.users.first() || user;

        if (member) {
            const member = message.guild.member(user);
            if (member) {
                member.ban({
                    ression: msgArgs
                }).then(() => {
                    const embed = new MessageEmbed()
                        .setDescription(`<:STT_yes:778545433810173952> STT Premium banned  ${member} Reason:**` + " " + msgArgs + "**")
                        .setColor('#229954')
                        .setTimestamp()
                        .setFooter('STT Premium | Moderation')
                    message.channel.send(embed);
                    //let logembed = new MessageEmbed()
                    //    .setColor("RANDOM")
                    //   .setDescription(`**BAN** | ${member}`)
                    //    .addField(`Moderator:`, `${author}`)
                    //   .addField(`Channel: `, `${channel}`)
                    //   .addField(`Reason:`, msgArgs)
                    //    .addField(`Server:`, `${message.guild}`)
                    //    .setThumbnail(message.author.displayAvatarURL())
                    //    .setTimestamp()
                    //log_channel.send(logembed);
                    console.log(`I banned ${member} on ${message.guild}. Provided Reason:` + msgArgs);
                    message.delete();






                }).catch(err => {
                        const embed = new MessageEmbed()
                            .setColor('#F1C40F')
                            .setDescription('<:STT_no:778545452218974209> The bot was unable to ban this Person. Missing Permissions:`ADMINISTRATOR,BAN_MEMBERS` ')
                            .addField('Error:', 'The bot is missing Permissions')
                            .setFooter("Try ^help ban err for more info!")
                        message.reply(embed);
                        //log_channel.send(`Bot was unable to ban after request from ${author}. For more information type "^help ban err". _returned_`)
                        message.delete();
                        console.log(`${author} tried to ban ${member}`);

                        console.log(err);



                    }

                )










            } else {
                const embed = new MessageEmbed()
                    .setColor('#F1C40F')
                    .setDescription('<:STT_no:778545452218974209> Something went wrong!')
                    .addField('For more info use :', '^help ban err')
                message.channel.send(embed);
                message.delete();
                console.log(`${author} used the "^ban"`);

            }
        } else {
            const embed = new MessageEmbed()
                .setColor('#3F2DD2 ')
                .setDescription('You need to specify a Person! You need to use ^ban @[member] {reason}.')
                .addField('Error:', 'Didnt find mention (684sd68)')
            message.channel.send(embed);
            //log_channel.send(`${author} used ^ban but didnt mention a person that is on this server! _returned_`)
            message.delete();
            console.log(`${author} used the "^ban"`);


        }
    }

}