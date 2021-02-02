  const {
      MessageEmbed
  } = require('discord.js')
  module.exports = {
      name: "purge",
      category: "moderation",
      run: async (client, message, args) => {
          let permsembed = new MessageEmbed()
              .setDescription(`<:STT_no:778545452218974209> You can't use that ${message.author.username}!`)
              .addField("Error", 'Missing `MANAGE_MESSAGES`')
              .setColor("RANDOM")
          if (!message.member.permissions.has("MANAGE_MESSAGES")) // sets the permission
              return message.channel.send(
                  permsembed // returns this message to user with no perms
              );
          if (!args[0]) {
              const purgeembed = new MessageEmbed()
                  .setDescription("<:STT_no:778545452218974209> Please enter an amount of Messages you want to purge!")
                  .setColor("RANDOM")
              return message.channel.send(purgeembed)
          }

          let deleteAmount;

          if (parseInt(args[0]) > 100) {
              deleteAmount = 100;
          } else {
              deleteAmount = parseInt(args[0]);
          }

          await message.channel.bulkDelete(deleteAmount, true);

          const embed = new MessageEmbed()
              .setDescription(`<:STT_yes:778545433810173952> Successfully deleted ${deleteAmount} Messages`)
              .setFooter(message.author.username, message.author.displayAvatarURL())
              .setColor('#f2f2f2')
          await message.channel.send(embed)
      }
  }