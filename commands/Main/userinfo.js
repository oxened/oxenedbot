const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Получить информацию о пользователе")
        .addSubcommand(sc => sc
            .setName('discord')
            .setDescription('Получить информацию про пользователя в Discord')
            .addUserOption(option => option
                .setName('discord-user')
                .setDescription('k')))
        .addSubcommand(sc => sc
            .setName('github')
            .setDescription('Получить информацию про пользователя в GitHub')
            .addStringOption(option => option
                .setName('github-user')
                .setDescription('n')
                .setRequired(true))),

    async execute(interaction) {
        const command = interaction.options.getSubcommand();
        let user;
        let embed;
        switch (command) {

            case 'discord':
                user = interaction.options.getUser("discord-user") || interaction.user;
                const url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=4096`;
                const status = {
                    offline: "#585957",
                    online: "#25e610",
                    dnd: "#fc0303",
                    idle: "#fcba03"
                };
                const member = await interaction.guild.members.cache.get(user.id);
                let activity = member.presence.activities[0] || "None";
                activity.name === "Custom Status"
                    ? (activity = member.presence.activities[1])
                    : true;
                embed = new EmbedBuilder()
                    .setColor(status[member.presence?.status ?? "offline"])
                    .setAuthor({
                        name: `${user.username}#${user.discriminator}`,
                        iconURL: `https://cdn.discordapp.com/icons/${member.guild.id}/${member.guild.icon}.webp`
                    })
                    .setDescription(
                        `Активность: ${
                            activity === "None"
                                ? activity
                                : activity.name === "Spotify"
                                ? `Слушает **Spotify:** \`${activity.state} - ${activity.details}\``
                                : `Играет в **${activity.name}**`
                        }`
                    )
                    .setTitle("User Info")
                    .setThumbnail(url)
                    .addFields(
                        {
                            name: "Присоединился",
                            value: `К серверу: \`${new Date(
                                member.joinedTimestamp
                            ).toLocaleDateString()}\`\nК дискорду: \`${new Date(
                                user.createdTimestamp
                            ).toLocaleDateString()}\``,
                            inline: true
                        },
                        {
                            name: "Имя пользователя",
                            value: `На сервере: \`${
                                member.nickname || "None"
                            }\`\nВ дискорде: \`${user.username}\``,
                            inline: true
                        },
                        {
                            name: "Роли",
                            value: `Роли: ${member._roles
                                .filter((role) => role != "1100453984919101535")
                                .map((role) => (role = `<@&${role}>`))}`
                        }
                    )
                    .setFooter({text: `Id: ${user.id}`});
                interaction.reply({embeds: [embed]});

                break;

            case 'github': {
                user = interaction.options.getString('github-user')
                const User = await (await fetch(`https://api.github.com/users/${user}`)).json();
                
                console.log(User)
                if (User.message) {
                    return interaction.reply(`Пользователь \`${user}\` не найден`)
                } else {
                    embed = new EmbedBuilder()
                        .setColor('#1e1f22')
                        .setAuthor({
                            name: User.login,
                            iconURL: `https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png`
                        })
                        .setThumbnail(User.avatar_url)
                        .setDescription(User.bio)
                        .setTitle("User Info")
                        .addFields(
                            {
                                name: 'Ифнормация об аккаунте',
                                value: `Локация: \`${User.location ?? 'Не указано'}\`\n Репозитории: \`${User.public_repos}\`\n Регистрация: \`${new Date(User.created_at).toLocaleDateString()}\``,
                                inline: true
                            },
                            {
                                name: 'Информация о пользователе',
                                value: `Id: \`${User.id}\`\n Имя: \`${User.name}\``,
                                inline: true
                            }
                        )
                        .setFooter({text: User.html_url});

                    interaction.reply({
                        embeds: [
                            embed
                        ]
                    });
                }

                break;
            }
        }
    }
};
