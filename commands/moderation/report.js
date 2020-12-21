const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: "report",
    category: "moderation",
    description: "Sends a report to the developer",
    run: async (client, message) => {
        let author = message.author
        let channel = message.channel
        let args = msg.content.substring(PREFIX.length).split(" ");

        if (!args[0]) return message.channel.send(`:STT_no: ${author} You need to use a second argument. Example **^report [bug]**`);
        const user = message.mentions.users.first();
        const member = message.guild.member(user);
        let msgArgs = args.slice(1).join(" ");
        const embed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> Your Report has been sent to <@!420277395036176405> :` + " " + "**" + msgArgs + "**")
            .setColor('RANDOM')
        message.channel.send(embed);
        message.channel.send("Connection didn't time out and everything worked! Message got sent to `420277395036176405` !");
        let report_embed = new MessageEmbed()
            .setDescription(`New Report from ${author} in ${channel} from ${message.guild}:` + " " + msgArgs)
            .setColor("RANDOM")
        client.users.cache.get('420277395036176405').send(report_embed);
        console.log(`New Report from ${author}:` + msgArgs);
        message.delete();

    }
}