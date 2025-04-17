import { config } from 'dotenv';
import { Client, GatewayIntentBits, Partials, Events } from 'discord.js';

config();

// Create the client with required intents and partials
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel] // Required to receive DMs
});

// Bot is ready
client.once(Events.ClientReady, (readyClient) => {
  console.log(`🧙‍♂️ Archivist Yen Sid is online as ${readyClient.user.tag}`);
});

// Login with bot token
client.login(process.env.DISCORD_TOKEN);

    `api.lorcana-api.com/cards/fetch?displayonly=classifications;set_num;color;image;cost;inkable;name;type;lore;rarity;body_text;willpower;strength?pagesize=15&page=1`

