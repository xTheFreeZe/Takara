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
        let msgArgs = args[2] ? args.slice(2).join(" ") : 'no reason';
        let author = message.author
        const user = message.mentions.users.first() || await client.users.fetch(args[1]);
        const member = message.guild.member(user);
        const log_channel = message.guild.channels.cache.find(r => r.name === 'logs');
        const STTPremium = client.users.cache.get('749889822214324236')
        let argsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> ${message.author.username} please mention someone to ban and provide a reason. `)
            .setColor("RANDOM")
        let channel = message.channel
        let permsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> You can't use that ${message.author.username}!`)
            .addField("Error", 'Missing `BAN_MEMBERS`')
            .setColor("RANDOM")

        const nopersonembed = new MessageEmbed()
            .setDescription('<:STT_no:778545452218974209> Please mention someone!')
            .setColor('RANDOM')

        const reembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> Please provide a reason!")
            .setColor("RANDOM")

        const selfbanembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> You can't ban yourself!")
            .setColor("RANDOM")

        const nologembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> Please create a channel called `logs` before using this command!")
            .setColor("RANDOM")

        const STTbanembed = new MessageEmbed()
            .setDescription('<:STT_no:778545452218974209> You can not ban the Bot with this command!')
            .setColor('RED')

        //checks if author has permissions to ban people. If false, the message will return

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply(permsembed);

        //checks if there is a channel called 'logs'

        if (!log_channel) return message.channel.send(nologembed);

        // if there is no argument given, the message will return

        if (!args[1]) return message.channel.send(argsembed);

        //checks if you mentioned a person

        if (!user) return message.channel.send(nopersonembed);

        //checks if user provides a reason

        //if (!msgArgs) return message.channel.send(reembed), message.delete();

        //if command is being used in a DM channel, it will return

        if (message.channel instanceof Discord.DMChannel) return;

        //if command gets triggered by a bot, it will return

        if (message.author.bot) return;

        //if the mentioned user is STT Premium, the message will return

        if (user == STTPremium) return message.channel.send(STTbanembed);

        //checks if mentioned person is the author.If true, the message will return

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
                        .setTitle("<:STT_yes:778545433810173952> You have been banned!")
                        .addField('Server :', `${message.guild}`)
                        .addField('Reason :', msgArgs)
                        .setTimestamp()
                        .setColor("RANDOM")


                    const logembed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`BAN || ${user.tag}`)
                        .addField('Moderator', `${message.author.tag}`)
                        .addField('Channel', `${message.channel}`)
                        .addField('Reason', msgArgs)
                        .setTimestamp()

                    log_channel.send(logembed);
                    member.send(DMembed).catch(() => {
                        message.channel.send('An unexpected Error occured! The user probably had DMs disabled!');
                    })



                    console.log(`${message.author.tag} banned ${user.tag} on ${message.guild}. Provided Reason:` + msgArgs);
                    message.delete();






                }).catch(err => {
                        const embed = new MessageEmbed()
                            .setColor('#F1C40F')
                            .setDescription(`<:STT_no:778545452218974209> Bot could not ban ${user.tag}`)
                            .setFooter("Try ^help ban err or more info!")
                        message.reply(embed);

                        const errbanembed = new MessageEmbed()
                            .setColor('#F1C40F')
                            .setTitle('BAN')
                            .setDescription(`<:STT_no:778545452218974209> Bot failed to ban ${user}!`)
                            .addField('Moderator', `${message.author.tag}`)
                            .addField('Channel', `${message.channel}`)
                            .setTimestamp()
                        log_channel.send(errbanembed);
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

            const nonmentionembed = new MessageEmbed()
                .setColor('#F1C40F')
                .setTitle('BAN')
                .setDescription(`<:STT_no:778545452218974209> Command was triggered but noone was mentioned!`)
                .addField('Moderator', `${message.author.tag}`)
                .addField('Channel', `${message.channel}`)
                .setTimestamp()
            log_channel.send(nonmentionembed);
            message.delete();
            console.log(`${message.author.username} used ^ban on ${message.guild}`);


        }
    }

}