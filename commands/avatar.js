const {SlashCommandBuilder} = require("discord.js");
const {EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Аватар пользователя.")
        .addStringOption((option) =>
            option
                .setName("embed")
                .setDescription("style")
                .setRequired(true)
                .addChoices(
                    {name: "embed", value: "true"},
                    {name: "non-embed", value: "false"}
                )
        )
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription(
                    "Пользователь, аватар которого вы хотите увидеть."
                )
                .setRequired(false)
        ),
    async execute(interaction) {
        let emb = interaction.options.getString("embed");
        let user = interaction.options.getUser("user");
        if (user == null) {
            user = interaction.user;
        }
        console.log(user);
        const url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=4096`;
        if (emb == "true") {
            const embed = new EmbedBuilder()
                .setDescription(
                    `**[[PNG]](https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=4096)** **[[JPEG]](https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg?size=4096)** **[[WebP]](${url})**`
                )
                .setAuthor({name: `${user.username}#${user.discriminator}`})
                .setColor("#808080")
                .setImage(url);
            await interaction.reply({embeds: [embed]});
        } else {
            await interaction.reply(url);
        }
    },
};
