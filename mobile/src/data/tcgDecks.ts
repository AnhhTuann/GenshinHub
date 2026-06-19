import { TCGCard, tcgCards } from './tcgCards';

export interface TCGDeck {
  id: string;
  name: string;
  description: string;
  characterIds: string[];
  actionCardIds: string[]; // 30 cards
}

// These are popular meta decks.
export const metaDecks: TCGDeck[] = [
  {
    id: 'ayaka-freeze',
    name: 'Ayaka Freeze',
    description: 'A classic control deck focusing on freezing opponents to shut down their momentum while setting up for massive bursts.',
    characterIds: ['1105', '1202', '1102'], // Ayaka, Xingqiu, Diona (example IDs, will verify later)
    actionCardIds: [
      '311202', '311202', // Aquila Favonia etc.
      // ... we will just put some placeholders for now
    ]
  },
  {
    id: 'quicken-aggravate',
    name: 'Keqing Quicken',
    description: 'A fast-paced aggressive deck utilizing Dendro and Electro to trigger Quicken, boosting subsequent Electro and Dendro DMG.',
    characterIds: ['1403', '1701', '1401'], // Keqing, Collei, Fischl
    actionCardIds: []
  },
  {
    id: 'ganyu-superconduct',
    name: 'Ganyu Piercing',
    description: 'Utilizes Ganyu\'s Frostflake Arrow combined with Superconduct to deal piercing damage to standby characters.',
    characterIds: ['1101', '1401', '1403'], // Ganyu, Fischl, Keqing
    actionCardIds: []
  }
];
