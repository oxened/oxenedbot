const {SlashCommandBuilder} = require("discord.js");
const {execSync} = require("node:child_process");
const loshara = ["1043211191067103263", "530377558508699659"];
// НЕ ДОДЕЛАНО
module.exports = {
    data: new SlashCommandBuilder()
        .setName("bash")
        .setDescription("?")
        .addStringOption((option) =>
            option.setName("command").setDescription("?").setRequired(true)
        ),
    async execute(interaction) {
        if (!loshara.includes(interaction.user.id)) {
            interaction.reply("🙄");
            return;
        }
        const res = execSync(interaction.options.getString("command"))
            .toString("ucs2")
            .slice(0, 1900);
        interaction.reply(` \`\`\`${res}\`\`\` `);
    },
};
