const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

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
  async execute (interaction) {
    const user = interaction.options.getUser('user') || interaction.user
    const url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=4096`
    const status = {
      offline: '#585957',
      online: '#25e610',
      dnd: '#fc0303',
      idle: '#fcba03'
    }
    // console.log(user);
    const member = await interaction.guild.members.cache.get(user.id)
    let activity = member.presence.activities[0] || 'None'
    activity.name === 'Custom Status'
      ? (activity = member.presence.activities[1])
      : true
    const embed = new EmbedBuilder()
      .setColor(status[member.presence?.status ?? 'offline'])
      .setAuthor({
        name: `${user.username}#${user.discriminator}`,
        iconURL: `https://cdn.discordapp.com/icons/${member.guild.id}/${member.guild.icon}.webp`
      })
      .setDescription(
                `Активность: ${
                    activity === 'None'
                        ? activity
                        : activity.name === 'Spotify'
                        ? `Слушает **Spotify:** \`${activity.state} - ${activity.details}\``
                        : `Играет в **${activity.name}**`
                }`
      )
      .setTitle('User Info')
      .setThumbnail(url)
      .addFields(
        // {
        //     name: "\u200B",
        //     value: "\u200B",
        // },
        {
          name: 'Присоединился',
          value: `К серверу: \`${new Date(
                        member.joinedTimestamp
                    ).toLocaleDateString()}\`\nК дискорду: \`${new Date(
                        user.createdTimestamp
                    ).toLocaleDateString()}\``,
          inline: true
        },
        {
          name: 'Имя пользователя',
          value: `На сервере: \`${
                        member.nickname || 'None'
                    }\`\nВ дискорде: \`${user.username}\``,
          inline: true
        },
        {
          name: 'Роли',
          value: `Роли: ${member._roles
                        .filter((role) => role != '1100453984919101535')
                        .map((role) => (role = `<@&${role}>`))}`
        }
      )
      .setFooter({ text: `Id: ${user.id}` })
    console.log(member.presence)
    await interaction.reply({ embeds: [embed] })
  }
}
