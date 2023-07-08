const { SlashCommandBuilder } = require('discord.js')
const { inspect } = require('util')
const loshara = ['1043211191067103263', '530377558508699659', '493681799864647691']

module.exports = {
    data: new SlashCommandBuilder()
    .setName('eval')
    .setDescription('для лошар')
    .addStringOption((option) => option.setName('command').setDescription('...').setRequired(true)),
  async execute (interaction) {
    const mamatvoya = interaction.user.id
    
    if (!loshara.includes(mamatvoya)) {
        interaction.reply('В иркутске есть автобусы, в которые можно сесть, и подумать, почему вы живёте в иркутске. А ведь действительно, иркутска же не существует. Погодите.');
        return;
    }
    
    let res;
    
    interaction.deferReply();

    try {
        res = eval(interaction.options.getString('command'));
    } catch (error) {
        res = error;
    }
    
    interaction.editReply(
        `\`\`\`js\n${inspect(res, { depth: 0 }).slice(0, 1900)}\n\`\`\``
    );
  }
}
