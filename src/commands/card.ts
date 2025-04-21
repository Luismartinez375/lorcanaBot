// src/commands/card.ts
import { SlashCommandBuilder } from 'discord.js';

export const cardCommand = new SlashCommandBuilder()
  .setName('card')
  .setDescription('Search for Lorcana cards by name.')
  .addStringOption(option =>
    option
      .setName('name')
      .setDescription('Card name to search for')
      .setRequired(true).setAutocomplete(true)
  ).addBooleanOption(option => 
    option
      .setName('inkable')
      .setDescription('Filter by inkable cards')
      .setRequired(false)).addStringOption(option => 
        option
            .setName('inkcolor')
            .setDescription('Card color to search for')
            .setRequired(false)
            .setChoices(
                { name: 'Amber', value: 'Amber' },
                { name: 'Amethyst', value: 'Amethyst' },
                { name: 'Emerald', value: 'Emerald' },
                { name: 'Ruby', value: 'Ruby' },
                { name: 'Sapphire', value: 'Sapphire' },
                { name: 'Steel', value: 'Steel' }
            )
    ).addNumberOption(option =>
    option
      .setName('cost')
        .setDescription('Filter by cost')
        .setRequired(false)
        .setMinValue(0)
        .setMaxValue(10)
      );
