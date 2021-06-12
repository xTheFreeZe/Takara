const {
    MessageEmbed
} = require('discord.js');
const talkedRecently = new Set();
module.exports = {
    name: "report",
    category: "moderation",
    description: "Sends a report to the developer",
    run: async (client, message, PREFIX) => {
        if (talkedRecently.has(message.author.id)) {
            const timemebed = new MessageEmbed()
                .setDescription("<:STT_no:778545452218974209> To prevent spamming, this command has a **5 Minute** Cooldown!")
                .setColor("#FF0000")
            message.channel.send(timemebed);

        } else {

            let author = message.author
            let channel = message.channel
            let args = message.content.substring(PREFIX.length).split(" ");
            const argsembed = new MessageEmbed()
                .setDescription(`<:STT_no:778545452218974209> ${message.author.username} please provide a bug to report.`)
                .setColor("RANDOM")
            if (!args[1]) return message.channel.send(argsembed);
            const user = message.mentions.users.first();
            const member = message.guild.member(user);
            let msgArgs = args.slice(1).join(" ");

            const embed = new MessageEmbed()
                .setDescription(`<:STT_yes:778545433810173952> Your Report has been sent to <@!420277395036176405> :` + " " + "**" + msgArgs + "**")
                .setColor('RANDOM')
                .setFooter("Takara | Moderation")
            message.channel.send(embed);

            let report_embed = new MessageEmbed()
                .setDescription(`New Report from ${author} in ${channel} from ${message.guild}:` + " " + msgArgs)
                .setColor("RANDOM")
            client.users.cache.get('420277395036176405').send(report_embed);
            console.log(`New Report from ${author}:` + msgArgs);
            message.delete();

            // Adds the user to the set so that they can't talk for a minute
            talkedRecently.add(message.author.id);
            setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(message.author.id);
            }, 300000);
        }

    }
}
