const {
    Client,
    GatewayIntentBits,
    Collection,
    ActivityType,
    SlashCommandBuilder,
} = require("discord.js");
const { token, clientId } = require("./commands/src/config.json");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
    ],
    presence: {
        status: "idle",
        activities: [{name: "😭", type: ActivityType.Playing}],
    },
});
const fs = require("node:fs");
const path = require("node:path");
client.commands = new Collection();

client.on("ready", async () => {
    console.log(client.user.tag);
    const commandsPath = path.join(__dirname, "commands");
    // console.log(commandsPath)
    fs.readdirSync(commandsPath).forEach((folder) => {
        const cP = path.join("commands", folder);
        const commandsFiles = fs
            .readdirSync(cP)
            .filter((file) => file.endsWith("js"));
        let filePath;
        let command;
        // console.log(`${commandsPath}/${cP.split('/')[1]}`)
        for (const file of commandsFiles) {
            try {
                filePath = path.join(
                    `${commandsPath}/${cP.split("/")[1]}`,
                    file
                );
                command = require(filePath);
            } catch {
                filePath = path.join(
                    `${commandsPath}/${cP.split("/")[1]}`,
                    file
                );
                command = require(filePath);
            }
            
            console.log(file.slice(0, -3));
            
            if (command.data && command.execute) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`В ${filePath} не указан "data" или "execute"`);
            }
        }
    });

    try {
        console.log("Обновление команд");
        await client.application.commands.set(
            client.commands.map((c) => c.data)
        );
        console.log("Обновление команд завершено :wtf2:");
    } catch (error) {
        console.error(error);
    }
});

client.on("interactionCreate", async (interaction, message, user) => {
    if (!interaction.isChatInputCommand()) return;
    const cmd = interaction.client.commands.get(interaction.commandName);
    try {
        await cmd.execute(interaction);
    } catch (error) {
        interaction.reply("Егор отшибка 😭");
        console.log(error);
    }
});

process.on("uncaughtException", (err) => {
    console.error(err);
});

client.on("messageCreate", (message) => {
    const msg = message.content;
    if (msg.includes(`<@${clientId}>`)) {
        message.reply("Больше никакого <a:AU_Z:1067782077065478266>.");
    }
});

client.login(token);
