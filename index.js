const { Client, GatewayIntentBits, Collection, Events, REST, Routes, ActivityType, SlashCommandBuilder } = require('discord.js')
const { token, clientid } = require("./config.json")
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fs = require('node:fs');
const path = require('node:path');
const util = require('util');
client.commands = new Collection();
const rest = new REST({ version: '10' }).setToken(token);

const ban = new SlashCommandBuilder()
	.setName("ban")
	.setDescription("Забанить.")
	.addUserOption(option => option
		.setName("user")
		.setDescription("Укажите пользователя.")
		.setRequired(true)
	)

const eval_ = new SlashCommandBuilder()
	.setName("eval")
	.setDescription("eval")
	.addStringOption(option => option
		.setName("command")
		.setDescription("...")
		.setRequired(true)
	)
const commands = [ban, eval_]

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


client.on('interactionCreate', async (interaction, message, user) => {
	if(!interaction.isChatInputCommand()) return

	if(interaction.commandName == 'ban') {
		const loshped = interaction.options.getUser('user')
		if(loshped == '530377558508699659') { 
			await interaction.reply("Вы не можете забанить создателя сервера.")
		} else if(loshped == '1023594263176564878') {
			await interaction.reply("маму свою забань мудила")
		}
		await interaction.reply(`Пользователь ${interaction.options.getUser('user')} был забанен. <:ralsei_wtf:1084577747063545886> <a:AU_Z:1067782077065478266>`)
	}
	if(interaction.commandName == 'eval') {
		if(interaction.user.id != 530377558508699659) {
			await interaction.reply("бёже бёт")
		}
		try { 
			const res = await eval(interaction.options.getString('command')) 
			await interaction.reply(`⚙️ ТЕХНИКА РАБОТАЕТ ✅ ${res}`)
		} catch(error) { console.log(error); await interaction.reply(`⚙️ ТЕХНИКА НЕ РАБОТАЕТ ❎ ${error}`) }
	}
})

process.on('uncaughtException', (err) => {
	console.log(err)
})

client.login(token)
