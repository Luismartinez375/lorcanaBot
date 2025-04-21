export interface Card {
    Name: string;
    Cost: number;
    Type: string;
    Color: string;
    Inkable: boolean;
    Body_Text: string;
    Rarity: string;
    Image: string;
    Set_Num: number;
   
}
export interface CharacterCard extends Card {
    Classifications: string;
    Strength: number;
    Willpower: number;
    Lore: number;
}