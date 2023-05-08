const {
  Client,
  GatewayIntentBits,
  Collection,
  Events,
  REST,
  ActivityType,
  SlashCommandBuilder,
} = require('discord.js');
const { token, clientid, bingc } = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  presence: {
    status: 'idle',
    activities: [{ name: '😭', type: ActivityType.Playing }],
  },
});

const fs = require('node:fs');
const path = require('node:path');
const { inspect } = require('util');
client.commands = new Collection();
const rest = new REST({ version: '10' }).setToken(token);



let loshara = ["1043211191067103263", "530377558508699659"]

client.on('ready', async () => {
  console.log(client.user.tag);

  const commandsPath = path.join(__dirname, 'commands');
  const commansFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'));

  for (const file of commansFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
      commands.push(command.data.toJSON());
    } else {
      console.log(`в ${filePath} нет "data" или "execute"`);
    }
  }

  try {
    console.log('обновление команд');
    await client.application.commands.set(client.commands.map((c) => c.data));
    console.log('обновление команд завершено :wtf2:');
  } catch (error) {
    console.error(error);
  }
});

client.on('interactionCreate', async (interaction, message, user) => {
  if (!interaction.isChatInputCommand()) return;
  const cmd = interaction.client.commands.get(interaction.commandName);
  try {
    await cmd.execute(interaction);
  } catch (error) {
    interaction.reply('Егор отшибка 😭');
    console.log(error);
  }
});

process.on('uncaughtException', (err) => {
  console.error(err);
});

client.on('messageCreate', (message) => {
  let msg = message.content;
  if (msg.includes(`<@${clientid}>`)) {
    message.reply('Больше никакого <a:AU_Z:1067782077065478266>.');
  }
});

client.login(token);
