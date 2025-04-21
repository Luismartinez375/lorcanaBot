// src/registerCommands.ts
import { REST, Routes } from 'discord.js';
import { cardCommand } from './commands/card';
import { helpCommand } from './commands/help';
import dotenv from 'dotenv';
import { allCommands } from './commands';


dotenv.config();
const commands = allCommands.map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

(async () => {
  try {
    console.log('🔁 Registering slash commands...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID!),
      { body: commands }
    );
    console.log('✅ Slash commands registered!');
  } catch (error) {
    console.error('❌ Failed to register commands:', error);
  }
})();
