import { Player } from './player.interface';

export interface GameState {
  player: Player;
  timestamp: number;
}