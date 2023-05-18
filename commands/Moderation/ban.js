const { SlashCommandBuilder } = require('discord.js')
const { clientid } = require('../src/config.json')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('забанить')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('пользователь')
        .setRequired(true)
    ),
  async execute (interaction) {
    const loshped = interaction.options.getUser('user')
    let msg
    switch (loshped.id) {
      case '530377558508699659':
        msg = 'Вы не можете забанить создателя сервера.'
        break
      case clientid:
        msg = 'Маму свою забань, мудила.'
        break
      case interaction.user.id:
        msg = 'Самокритично.'
        break
      default:
        msg = `${loshped} был забанен. <:ralsei_wtf:1103379157620097205> <a:Z_:1099932029627400192>`
    }
    interaction.reply(msg)
  }
}
