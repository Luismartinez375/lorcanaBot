// src/commands/index.ts
import { cardCommand } from './card';
import { helpCommand } from './help';
import { setlistCommand } from './setlist';
export const allCommands = [cardCommand, helpCommand, setlistCommand];
