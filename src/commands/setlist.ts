// src/commands/setlist.ts
import { SlashCommandBuilder } from 'discord.js';

export const setlistCommand = new SlashCommandBuilder()
  .setName('setlist')
  .setDescription('View cards from a specific Lorcana set')
  .addStringOption(option =>
    option
      .setName('set')
      .setDescription('Choose a Lorcana set')
      .setRequired(true)
      .setChoices(
        { name: 'The First Chapter', value: '1' },
        { name: 'Rise of the Floodborn', value: '2' },
        { name: 'Into the Inklands', value: '3' },
        { name: 'Ursula’s Return', value: '4' },
        { name: 'Shimmering Skies', value: '5' },
        { name: 'Azurite Sea', value: '6' },
      {name: 'Archazia`s Island', value: '7'},
      )
  )
  .addStringOption(option =>
    option
      .setName('color')
      .setDescription('Filter by card color')
      .addChoices(
        { name: 'Amber', value: 'Amber' },
        { name: 'Amethyst', value: 'Amethyst' },
        { name: 'Emerald', value: 'Emerald' },
        { name: 'Ruby', value: 'Ruby' },
        { name: 'Sapphire', value: 'Sapphire' },
        { name: 'Steel', value: 'Steel' }
      ).setRequired(false)
  )
  .addStringOption(option =>
    option
      .setName('rarity')
      .setDescription('Filter by card rarity')
      .addChoices(
        { name: 'Common', value: 'Common' },
        { name: 'Uncommon', value: 'Uncommon' },
        { name: 'Rare', value: 'Rare' },
        { name: 'Super Rare', value: 'Super Rare' },
        { name: 'Legendary', value: 'Legendary' }
      ).setRequired(false)
  );
