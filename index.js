const { Client, GatewayIntentBits, Collection, Events, REST, Routes, ActivityType, SlashCommandBuilder } = require('discord.js')
const { token, clientid } = require("./config.json")
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fs = require('node:fs');
const path = require('node:path');
client.commands = new Collection();
const rest = new REST({ version: '10' }).setToken(token);

const ban = new SlashCommandBuilder().setName("ban").setDescription("да")
const commands = [ban]

client.on('ready', async () => {
	console.log(client.user.tag)

	client.user.setPresence({
		status: 'idle',
		activities: [{
			name: "ок и",
			type: ActivityType.Playing,
		}]
	})
	try {
		console.log("хахвхвха ну типо э")
		await rest.put(Routes.applicationCommands(clientid), { body: commands })
		console.log("всё.")
	} catch(error) { console.error(error) }
})


client.on('interactionCreate', async (interaction) => {
	if(!interaction.isChatInputCommand()) return

	if(interaction.commandName == 'ban') {
		await interaction.reply("скоро")
	}
})
client.login(token)
