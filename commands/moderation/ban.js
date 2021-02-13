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
        const user = message.mentions.users.first();
        const member = message.guild.member(user);
        let argsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> ${message.author.username} please mention someone to ban and provide a reason. `)
            .setColor("RANDOM")
        let channel = message.channel
        let permsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> You can't use that ${message.author.username}!`)
            .addField("Error", 'Missing `BAN_MEMBERS`')
            .setColor("RANDOM")
        const reembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> Please provide a reason!")
            .setColor("RANDOM")
        const selfbanembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> You can't ban yourself!")
            .setColor("RANDOM")

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply(permsembed);
        if (!args[1]) return message.channel.send(argsembed);
        if (!msgArgs) return message.channel.send(reembed), message.delete();
        if (message.channel instanceof Discord.DMChannel) return;
        if (message.author.bot) return;
        if (user == message.author) return message.channel.send(selfbanembed);

        if (user) {
            if (member) {
                member.ban({
                    reason: (msgArgs + " " + `|| Moderator : ${message.author.tag}`),
                    ression: msgArgs
                }).then(() => {
                    const embed = new MessageEmbed()
                        .setDescription(`<:STT_yes:778545433810173952> STT Premium banned  ${member} Reason:**` + " " + msgArgs + "**")
                        .setColor('#229954')
                        .setTimestamp()
                        .setFooter('STT Premium | Moderation')
                    message.channel.send(embed);

                    const DMembed = new MessageEmbed()
                        .setDescription("<:STT_yes:778545433810173952> You have been banned!")
                        .addField('Server :', `${message.guild}`)
                        .addField('Reason :', msgArgs)
                        .setThumbnail(`${message.guild.iconURL()}`)
                        .setTimestamp()
                        .setColor("RANDOM")

                    member.send(DMembed);
                    console.log(`I banned ${user.tag} on ${message.guild}. Provided Reason:` + msgArgs);
                    message.delete();






                }).catch(err => {
                        const embed = new MessageEmbed()
                            .setColor('#F1C40F')
                            .setDescription('<:STT_no:778545452218974209> The bot was unable to ban this Person. Missing Permissions:`ADMINISTRATOR,BAN_MEMBERS` ')
                            .setFooter("Try ^help ban err or more info!")
                        message.reply(embed);
                        //log_channel.send(`Bot was unable to ban after request from ${author}. For more information type "^help ban err". _returned_`)
                        message.delete();
                        console.log(`${message.author.username} tried to ban ${member} on ${message.guild}`);

                        console.log(err);



                    }

                )










            } else {
                message.reply("That user isnt  on the Server")

            }
        } else {
            const embed = new MessageEmbed()
                .setColor('#3F2DD2 ')
                .setDescription('You need to specify a Person! You need to use ^ban @[member] {reason}.')
            message.channel.send(embed);
            //log_channel.send(`${author} used ^ban but didnt mention a person that is on this server! _returned_`)
            message.delete();
            console.log(`${message.author.username} used ^ban on ${message.guild}`);


        }
    }

}