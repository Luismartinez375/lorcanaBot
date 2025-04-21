// src/utils/createCardEmbed.ts
import { EmbedBuilder } from 'discord.js';
import { Card } from '../types/types';

export function createCardEmbed(card: Card) {
  return new EmbedBuilder()
    .setTitle(card.Name)
    .setImage(card.Image)
    .setDescription(card.Body_Text || 'No description.')
    .addFields(
      { name: 'Cost', value: card.Cost.toString(), inline: true },
      { name: 'Color', value: card.Color, inline: true },
      { name: 'Type', value: card.Type, inline: true },
      { name: 'Rarity', value: card.Rarity, inline: true }
    )
    .setFooter({ text: `Set ${card.Set_Num} • ${card.Inkable ? 'Inkable' : 'Not Inkable'}` })
    .setColor(0x6c3eff);
}
