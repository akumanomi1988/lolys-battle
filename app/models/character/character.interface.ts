export interface Character {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  unlocked: boolean;
  level: number;
  baseMultiplier: number;
}