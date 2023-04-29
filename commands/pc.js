const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pc")
    .setDescription("лист первых 10 демонов из pointercrate"),
  async execute(interaction) {
    let answer = '';
    await fetch("https://pointercrate.com/api/v2/demons/listed?limit=10").then(res => res.json()).then((top) => {
        for (let pos = 0; pos < top.length; pos++) {
            answer = answer + `${pos + 1}) ${top[pos].name} | Id: ${top[pos].level_id}\n`
        }
    })
    await interaction.reply(answer)
  },
}
