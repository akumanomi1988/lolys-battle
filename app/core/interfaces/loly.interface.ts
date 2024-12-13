export interface LolyDialogues {
    intro: string[];
    defeat: string[];
    victory: string[];
}

export interface Loly {
    id: string;
    name: string;
    imagePath: string;
    level: number;
    maxHealth: number;
    currentHealth: number;
    coins: number;
    experience: number;
    dialogues: LolyDialogues;
}