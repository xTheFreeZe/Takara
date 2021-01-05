module.exports = {
    name: "unban",
    category: "moderation",
    description: "unbans a member from a guild",

    run: async (client, message, PREFIX) => {
        let args = message.content.substring(PREFIX.length).split(" ");
        const member = args[0]


        if (!member) {
            return message.channel.send("Please enter a valid user ID!");

        }

        try {
            message.guild.fetchBans().then(bans => {
                message.guild.members.unban(member)
            })
            await message.channel.send(`${member} has been unbanned`);

        } catch (e) {
            return message.channel.send("Something has happened and I could not unban this Member");
        }

    }
}