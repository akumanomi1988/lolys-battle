export interface Player {
  level: number;
  experience: number;
  coins: number;
  gems: number;
  tapDamage: number;
  autoClickDamage: number;
}

export class PlayerModel {
  private static instance: PlayerModel;
  private _data: Player;

  private constructor() {
    this._data = {
      level: 1,
      experience: 0,
      coins: 0,
      gems: 0,
      tapDamage: 1,
      autoClickDamage: 0
    };
  }

  static getInstance(): PlayerModel {
    if (!PlayerModel.instance) {
      PlayerModel.instance = new PlayerModel();
    }
    return PlayerModel.instance;
  }

  get data(): Player {
    return this._data;
  }

  addExperience(amount: number): void {
    this._data.experience += amount;
    this.checkLevelUp();
  }

  addCoins(amount: number): void {
    this._data.coins += amount;
  }

  addGems(amount: number): void {
    this._data.gems += amount;
  }

  private checkLevelUp(): void {
    const experienceNeeded = this.calculateExperienceNeeded();
    if (this._data.experience >= experienceNeeded) {
      this._data.level++;
      this._data.experience -= experienceNeeded;
      this._data.tapDamage += Math.floor(this._data.level * 0.5);
    }
  }

  private calculateExperienceNeeded(): number {
    return Math.floor(100 * Math.pow(1.1, this._data.level - 1));
  }
}