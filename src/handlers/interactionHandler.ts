// src/handlers/interactionHandler.ts
import {
    ChatInputCommandInteraction,
    StringSelectMenuInteraction,
    Interaction,
  } from 'discord.js';
  import { fetchCards } from '../utils/fetchCards';
  import { createCardEmbed } from '../utils/createCardEmbed';
  
  export async function handleInteraction(interaction: Interaction) {
    if (interaction.isChatInputCommand() && interaction.commandName === 'card') {
        const name = interaction.options.getString('name', true);
        const inkable = interaction.options.getBoolean('inkable') ?? undefined;
        const inkColor = interaction.options.getString('inkColor') ?? undefined;
        const cost = interaction.options.getNumber('cost') ?? undefined;
        
        const { characters, others } = await fetchCards({
            Name: name,
            ...(inkable !== undefined && { Inkable: inkable }),
            ...(inkColor && { Color: inkColor }),
            ...(cost !== undefined && { Cost: cost }),
          });
  
      const cards = [...characters, ...others].slice(0, 10); // cap to 10 for select menu
  
      if (cards.length === 0) {
        await interaction.reply({ content: '❌ No cards found.', ephemeral: true });
        return;
      }
  
      const selectMenu = {
        type: 3,
        custom_id: 'card-select',
        placeholder: 'Select a card to display',
        options: cards.map((card) => ({
          label: card.Name,
          description: `${card.Color} • ${card.Type} • ${card.Rarity}`,
          value: JSON.stringify({ Name: card.Name, Set_num: card.Set_num }),
        })),
      };
  
      await interaction.reply({
        content: '🔍 Select a card:',
        components: [
          {
            type: 1, // ActionRow
            components: [selectMenu],
          },
        ],
      });
    }
    if (interaction.isChatInputCommand() && interaction.commandName === 'help') {
        await interaction.reply({
          ephemeral: true,
          embeds: [
            {
              title: '🧙‍♂️ Archivist Yen Sid Help Menu',
              description: 'Here are the available commands and how to use them:',
              color: 0x5865F2, // Discord blurple
              fields: [
                {
                  name: '/card',
                  value: 'Search Lorcana cards by name, ink color, cost, or inkable status. You’ll get a list to pick from.',
                },
                {
                  name: '/setlist (Coming Soon)',
                  value: 'See cards by set, with filtering by rarity, color, and more.',
                },
                {
                  name: '/help',
                  value: 'View this help menu.',
                },
              ],
              footer: {
                text: 'Need more help? Tag a mod or ask in #help-and-feedback',
              },
            },
          ],
        });
      }
      if (interaction.isChatInputCommand() && interaction.commandName === 'setlist') {
        const set = interaction.options.getString('set', true);
        const color = interaction.options.getString('color');
        const rarity = interaction.options.getString('rarity');
      
        const searchParams: Record<string, string | number> = { Set_num: set };
        if (color) searchParams.Color = color;
        if (rarity) searchParams.Rarity = rarity;
      
        const { characters, others } = await fetchCards(searchParams);
        const cards = [...characters, ...others].slice(0, 10);
      
        if (cards.length === 0) {
          await interaction.reply({ content: '❌ No cards found for that set.', ephemeral: true });
          return;
        }
      
        const selectMenu = {
          type: 3,
          custom_id: 'card-select',
          placeholder: 'Select a card to display',
          options: cards.map((card) => ({
            label: card.Name,
            description: `${card.Color} • ${card.Type} • ${card.Rarity}`,
            value: JSON.stringify({ Name: card.Name, Set_num: card.Set_num }),
          })),
        };
      
        await interaction.reply({
          content: '📚 Cards from selected set:',
          components: [
            {
              type: 1,
              components: [selectMenu],
            },
          ],
        });
      }
      
      
  
    if (interaction.isStringSelectMenu() && interaction.customId === 'card-select') {
      const selected = JSON.parse(interaction.values[0]);
      const { characters, others } = await fetchCards(selected);
      const result = [...characters, ...others][0];
  
      if (!result) {
        await interaction.update({ content: '❌ Could not find the selected card.', components: [] });
        return;
      }
  
      const embed = createCardEmbed(result);
      await interaction.update({ content: '', embeds: [embed], components: [] });
    }
  }
  