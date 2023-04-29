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
	.setDescription("eval")
	.addStringOption(option => option
		.setName("command")
		.setDescription("...")
		.setRequired(true)
	)
const pc = new SlashCommandBuilder()
	.setName("pc")
	.setDescription("pointercrate")
const cmds = [ban, eval_, pc]

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

  const folder = fs.readdirSync(path.join("commands"))
  const foldersPath = path.join(__dirname, 'commands');

  for (const file of folder) {
    const filePath = path.join(foldersPath, file)
    const command = require(filePath)
    commands.push(command.data.toJSON())
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

	if(interaction.commandName == 'ban') {
		const loshped = interaction.options.getUser('user')
		if(loshped == '530377558508699659') {
			await interaction.reply("Вы не можете забанить создателя сервера.");
		} else if(loshped == clientid) {
			await interaction.reply("маму свою забань мудила");
		} else {
		await interaction.reply(`Пользователь ${interaction.options.getUser('user')} был забанен. <:ralsei_wtf:1084577747063545886> <a:AU_Z:1067782077065478266>`); 
		}
	}

	if(interaction.commandName == 'eval') {
		let mamatvoya = interaction.user.id;
		if(!loshara.includes(mamatvoya)) {
			await interaction.reply("В иркутске есть автобусы, в которые можно сесть, и подумать, почему вы живёте в иркутске. А ведь действительно, иркутска же не существует. Погодите.");
			return;
		}
		let res;
		await interaction.deferReply();

		try {
			res = await eval(interaction.options.getString('command'));
		} catch(error) { res = error }
		await interaction.editReply(`\`\`\`js\n${inspect(res, { depth: 0 }).slice(0, 1900)}\n\`\`\``);
	}

	if(interaction.commandName == 'pc') {
        let answer = '';
        await fetch("https://pointercrate.com/api/v2/demons/listed?limit=10").then(res => res.json()).then((top) => {
            for (let pos = 0; pos < top.length; pos++) {
                answer = answer + `${pos + 1}) ${top[pos].name} | Id: ${top[pos].level_id}\n`
            }
        })  
        await interaction.reply(answer)
	}
  const cmd = client.commands.get(interaction.commandName)
  try { cmd.execute(interaction) } catch { interaction.reply("блять.") }
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
