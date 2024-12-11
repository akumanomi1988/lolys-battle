export interface Enemy {
  id: number;
  name: string;
  maxHealth: number;
  currentHealth: number;
  coins: number;
  experience: number;
}

export class EnemyModel {
  static generateEnemy(playerLevel: number): Enemy {
    const baseHealth = 10;
    const healthMultiplier = Math.pow(1.1, playerLevel - 1);
    const maxHealth = Math.floor(baseHealth * healthMultiplier);

    return {
      id: Date.now(),
      name: `Enemy Lvl ${playerLevel}`,
      maxHealth,
      currentHealth: maxHealth,
      coins: Math.floor(maxHealth * 0.5),
      experience: Math.floor(maxHealth * 0.3)
    };
  }
}