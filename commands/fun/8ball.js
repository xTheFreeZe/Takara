const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: "8ball",
    category: "fun",
    description: "replies with a random answer",

    run: async (client, message, PREFIX) => {
        let args = message.content.substring(PREFIX.length).split(" ");
        const messages = ["yeah", "nope", "NO!", "Of course", "not sure about that one", "I dont know but you are kinda dumb"]

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        const replymessages = ["The Bot thinks: ", "Bot is sure and says: ", "Easy answer: ", "Not even hard: ", "Thats a hard answer: ", "Bot doesn't care but says: "]

        const randomreplyMessage = replymessages[Math.floor(Math.random() * replymessages.length)];

        const replyemojis = ["<:KEKW:771738702686191677>", "<:dumb:703735803905572944> ", "<:pepega:728525939293814785>", "<:kappa:713669186756280320>", "<:pogchamp:713671100034187304>"]

        const randomreplyeomoji = replyemojis[Math.floor(Math.random() * replyemojis.length)];

        let argsembed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription("Ask something so I can answer...**Dummy** <:dumb:703735803905572944>")
            .addField('Usage:', '^8ball [question]')

        if (!args[1]) return message.channel.send(argsembed)

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(randomreplyMessage + "**" + randomMessage + "**" + " " + randomreplyeomoji)
            .setFooter("STT Premium | Fun")

        message.channel.send(embed);
    }
}