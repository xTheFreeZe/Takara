const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: "restart",
    category: "owner",
    run: async (client, message, args) => {
        if (message.author.id !== '420277395036176405') {
            const permsembed = new MessageEmbed()
                .setDescription('<:STT_no:778545452218974209> Only <@!42027739503617640> can use this command!')
                .setColor("RANDOM")

            return message.channel.send(permsembed)
        }
        const reembed = new MessageEmbed()
            .setDescription('<:STT_yes:778545433810173952> Restarting bot... Please wait!')
            .setColor('#229954')
        await message.channel.send(reembed)
        process.exit();
    }
}