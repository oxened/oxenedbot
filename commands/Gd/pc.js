const { SlashCommandBuilder } = require("discord.js");
const fetch = require('node-fetch');

// мб убрать
module.exports = {
    data: new SlashCommandBuilder()
        .setName("pc")
        .setDescription("Список первых 10-ти демонов из PointerCrate"),
    async execute(interaction) {
        // This NOT works because of cloudflare
        const top = await (await fetch("https://pointercrate.com/api/v2/demons/listed?limit=10")).json();
        let answer = "";
        
        for (let pos = 0; pos < top.length; pos++) {
            if (top[pos].level_id == null) {
                answer = answer + `${pos + 1}) ${top[pos].name}\n`;
            } else {
                answer = answer + `${pos + 1}) ${top[pos].name} (\`${top[pos].level_id}\`)\n`;
            }
        }
        
        interaction.reply(answer);
    }
};
