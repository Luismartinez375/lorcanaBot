// src/utils/fetchCards.ts
import axios from 'axios';
import { Card, CharacterCard } from '../types/types';

const BASE_URL =
  'https://api.lorcana-api.com/cards/fetch?displayonly=classifications;set_num;color;image;cost;inkable;name;type;lore;rarity;body_text;willpower;strength&pagesize=15&page=1';

function buildSearchQuery(filters: Record<string, string | number | boolean>): string {
  const entries = Object.entries(filters)
    .filter(([_, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${k}=${v}`)
    .join(';');

  return entries ? `&search=${entries}` : '';
}

export async function fetchCards(
  filters: Record<string, string | number | boolean> = {}
): Promise<{ characters: CharacterCard[]; others: Card[] }> {
  try {
    const query = buildSearchQuery(filters);
    const response = await axios.get(`${BASE_URL}${query}`);

    const cards = response.data;

    if (!Array.isArray(cards)) {
      throw new Error('Invalid response format');
    }

    const characters: CharacterCard[] = [];
    const others: Card[] = [];

    for (const card of cards) {
      if (card.Type === 'Character') {
        characters.push(card as CharacterCard);
      } else {
        others.push(card as Card);
      }
    }

    return { characters, others };
  } catch (error) {
    console.error('❌ Failed to fetch and sort Lorcana cards:', error);
    return { characters: [], others: [] };
  }
}
