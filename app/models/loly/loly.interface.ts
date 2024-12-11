export interface LolyDialogues {
  intro: string[];
  defeat: string[];
  victory: string[];
}

export interface LolyType {
  id: string;
  name: string;
  imagePath: string;
  dialogues: LolyDialogues;
}

export interface Loly extends LolyType {
  level: number;
  maxHealth: number;
  currentHealth: number;
  coins: number;
  experience: number;
}