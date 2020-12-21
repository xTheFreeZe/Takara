module.exports = {
    name: "test",
    category: "test",
    description: "description",
    run: async (client, message, args) => {

        if (message.content === "test") {
            message.reply("Hello!");
        }


    }
}