// src/index.ts
import { config } from 'dotenv';
import { Client, GatewayIntentBits, Partials, Events } from 'discord.js';
import { handleInteraction } from './handlers/interactionHandler';

config(); // Load .env

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel]
});

client.once(Events.ClientReady, () => {
  console.log(`🧙‍♂️ Archivist Yen Sid is online as ${client.user?.tag}`);
});

client.on(Events.InteractionCreate, handleInteraction);

// Login to Discord
client.login(process.env.DISCORD_TOKEN).catch((err) => {
  console.error('❌ Failed to log in:', err);
});
