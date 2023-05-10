const {
    Client,
    GatewayIntentBits,
    Collection,
    ActivityType,
} = require('discord.js');
const { token, clientid } = require('./commands/src/config.json');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
    ],
    presence: {
        status: 'idle',
        activities: [{ name: '😭', type: ActivityType.Playing }],
    },
});
const fs = require('node:fs');
const path = require('node:path');
client.commands = new Collection();

client.on('ready', async () => {
    console.log(client.user.tag);
    const commandsPath = path.join(__dirname, 'commands');
    // console.log(commandsPath)
    fs.readdirSync(commandsPath).forEach((folder) => {
        let cP = path.join('commands', folder);
        let commandsFiles = fs
            .readdirSync(cP)
            .filter((file) => file.endsWith('js'));
        // console.log(`${commandsPath}\\${cP.split('\\')[1]}`)
        for (const file of commandsFiles) {
            const filePath = path.join(
                `${commandsPath}\\${cP.split('\\')[1]}`,
                file
            );
            console.log(file.slice(0, -3));
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`в ${filePath} нет "data" или "execute"`);
            }
        }
    });

    try {
        console.log('обновление команд');
        await client.application.commands.set(
            client.commands.map((c) => c.data)
        );
        console.log('обновление команд завершено :wtf2:');
    } catch (error) {
        console.error(error);
    }
});

client.on('interactionCreate', async (interaction) => {
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
