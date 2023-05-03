const { Client, GatewayIntentBits, Collection, Events, REST, Routes, ActivityType, SlashCommandBuilder } = require('discord.js')
const { token, clientid } = require("./config.json")
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const fs = require('node:fs');
const path = require('node:path');
const { inspect }  = require('util');
client.commands = new Collection();
const rest = new REST({ version: '10' }).setToken(token);

const commands = []

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
	.setDescription("для лошар")
	.addStringOption(option => option
		.setName("command")
		.setDescription("...")
		.setRequired(true)
	)
const pc = new SlashCommandBuilder()
	.setName("pc")
	.setDescription("pointercrate")
const cmds = [ban, pc, eval_]

let loshara = ["1043211191067103263", "530377558508699659"]

client.on('ready', async () => {
	console.log(client.user.tag);

	client.user.setPresence({
		status: 'idle',
		activities: [{
			name: "э ну",
			type: ActivityType.Playing,
		}]
	})

    const commandsPath = path.join(__dirname, 'commands');
    const commansFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commansFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command)
        commands.push(command.data.toJSON())
    } else {
        console.log(`вы лошары, потому что ${filePath} без "data" или "execute"`)
    }
  }

	try {
		console.log("обновление команд");
        await client.application.commands.set(commands)
    //await client.application.commands.set(cmds)
		console.log("обновление команд завершено :wtf2:");
	} catch(error) { console.error(error); }
})


client.on('interactionCreate', async (interaction, message, user) => {
	if(!interaction.isChatInputCommand()) return;
    const cmd = interaction.client.commands.get(interaction.commandName);

	/* if(interaction.commandName == 'ban') {
		const loshped = interaction.options.getUser('user')
		if(loshped == '530377558508699659') {
			await interaction.reply("Вы не можете забанить создателя сервера.");
		} else if(loshped == clientid) {
			await interaction.reply("маму свою забань мудила");
		} else {
		await interaction.reply(`Пользователь ${interaction.options.getUser('user')} был забанен. <:ralsei_wtf:1084577747063545886> <a:AU_Z:1067782077065478266>`);
		}
	} */
    try {
        await cmd.execute(interaction)
    } catch(error) {
        interaction.reply("блять.");
        console.log(error)
    }

})

process.on('uncaughtException', (err) => {
	console.error(err);
});

client.on('messageCreate', (message) => {
	let msg = message.content
	if (msg.includes(`<@${clientid}>`)) {
		message.reply("Больше никакого <a:AU_Z:1067782077065478266>.");
	}
})

client.login(token);
