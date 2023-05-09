const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('ztest').setDescription('ок т'),
    async execute(interaction) {
        await interaction.reply('лошпед');
    },
};
