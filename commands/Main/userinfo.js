const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Получить информацию о пользователе')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('Пользователь, инфо о котором вас интересует')
                .setRequired(false)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        user == null ? (user = interaction.user) : true;
        //TODO
        console.log(user);
    },
};
