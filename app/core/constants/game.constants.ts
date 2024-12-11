export const GAME_CONSTANTS = {
  SAVE_KEY: 'LOLYS_BATTLE_SAVE',
  AUTO_SAVE_INTERVAL: 60000, // 1 minute
  AUTO_CLICK_INTERVAL: 1000, // 1 second
  
  INITIAL_PLAYER: {
    TAP_DAMAGE: 1,
    COINS: 0,
    GEMS: 0,
    LEVEL: 1,
    EXPERIENCE: 0
  },
  
  ENEMY: {
    BASE_HEALTH: 10,
    HEALTH_MULTIPLIER: 1.1,
    COIN_MULTIPLIER: 0.5,
    XP_MULTIPLIER: 0.3
  },
  
  LEVEL_UP: {
    BASE_XP: 100,
    XP_MULTIPLIER: 1.1,
    DAMAGE_INCREASE: 0.5
  }
};