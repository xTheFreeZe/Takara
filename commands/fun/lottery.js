const {
    MessageEmbed
} = require('discord.js');
const talkedRecently = new Set();
module.exports = {
    name: "lottery",
    category: "fun",
    description: "spinn the lottery and get the correct number",
    run: async (client, message, PREFIX) => {
        let args = message.content.substring(PREFIX.length).split(" ");

        let msgArgs = args.slice(1).join(" ");

        let usermessage = msgArgs

        var randomNumber = Math.floor(Math.random() * 3);

        let winningnumber = "2";

        const winningembed = new MessageEmbed()
            .setTitle('YOU WON! 🏆 <a:pepe_light:723577938913656842>')
            .setDescription('Congratulations for winning the Lottery!')
            .addField('Winning Number', `${winningnumber}`)
            .setColor('#32CD32')

        if (talkedRecently.has(message.author.id)) {
            const timemebed = new MessageEmbed()
                .setDescription("<:STT_no:778545452218974209> Please wait `3` seconds before using this command again!" + " " + `|| ${message.author.username}`)
                .setColor("#FF0000")
            message.channel.send(timemebed);

        } else {

            if (msgArgs) return message.channel.send(`Ehm, no! Numbers are random. Your Number **${usermessage} ** does nothing :joy:`)

            if (randomNumber == winningnumber) return message.channel.send(winningembed), console.log(`${message.author.username} just won the lottery! POG`);

            message.channel.send(`**${randomNumber}** isn't it!`);

            talkedRecently.add(message.author.id);
            setTimeout(() => {
                talkedRecently.delete(message.author.id);
            }, 3000);
        }


    }
}