const { SlashCommandBuilder } = require("discord.js")
const { clientid } = require("../config.json")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("забанить")
    .addUserOption(option => option
      .setName("user")
      .setDescription("пользователь")
      .setRequired(true)
  ),
  async execute (interaction) {
    let loshped = interaction.options.getUser("user")
    let msg = (loshped == "530377558508699659") ? "Вы не можете забанить создателя сервера." : (loshped == clientid) ? "Маму свою забань, мудила." : (loshped == interaction.user.id) ? "Самокритично." : `${loshped} был забанен. <:ralsei_wtf:1103379157620097205> <a:Z_:1099932029627400192>`
    interaction.reply(msg)
  }
}
