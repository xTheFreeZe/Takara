const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: "kill",
    category: "fun",
    description: "Sends a funny way of killing someone...",
    run: async (client, message, args, PREFIX) => {
        const user = message.mentions.users.first() || message.author;
        let author = message.author

        const messages = [
            `${message.author.username} kills ${user.username} with a knife 🔪 🩸 `,
            `${user.username} dies because of a car accident 🚗`,
            `During a party ${user.username} had a heart attack and died because if it... sagde ☹`,
            `Bruh...${user.username} just died...☠`,
            `${user.username} fell from a high place 🏙`,
            `Looks like ${user.username} played too much fortnite and just died because of it 💻`,
            `Someone did drink too much juice and ${user.username} passed out and died 🥤`,
            `${message.author.username} kills ${user.username} during an intense gun battle 🧨 🔫`,
            `A plane landed on ${user.username}... Sounds dumb but is true! ✈`,
            `A car didnt stop and crashed into ${user.username} but ${message.author.username} also dies because they laughed too hard...`,
            `STT Premium was too bored of thinking of a cool kill message so the bot just kills ${user.username} 🤖`,
            `A huge rock hits ${user.username} 😂`,
            `${user.username} got soooo old and died 🧓`,
            `${user.username} didn't look under the bed and got killed by a huge monster with long hairs 👹`,
            `Did you know you can die from being mad at a videogame? Because ${user.username} just died 💀`,
            `${user.username} thought they would be cool and strong enough to fight against a gang! They weren't strong enough <:pepega:728525939293814785>`,
            `${user.username} tried to swim in Lava 🔥`,
            `${user.username} experienced kinetic energy`,
            `${user.username} drowned!`,
            `${user.username} was squashed by a falling anvil`,
            `${user.username}died because the enemy reinhard didnt unbind his shift key`,
            `${user.username} died 😄`,
            ``

        ]

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        const argsembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> Please mention someone you want to kill!")
            .setColor("RANDOM")

        if (!args[0]) {

            return message.channel.send(argsembed)

        } else if (args[0] == 'me') {

            return message.channel.send("Dont kill yourself...")

        } else if (!args[1]) {

            return message.channel.send(randomMessage)

        } else if (args[0] == 'yourself') {

            return message.channel.send("<:STT_no:778545452218974209> Dont say that lmao!")
        }

    }
}