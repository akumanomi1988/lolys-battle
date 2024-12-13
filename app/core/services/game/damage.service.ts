import { PlayerModel } from '../../../models/player.model';
import { Loly } from '../../interfaces/models/loly.interface';

export class DamageService {
    constructor(private player: PlayerModel) {}

    applyTapDamage(loly: Loly): void {
        this.applyDamage(loly, this.player.data.tapDamage);
    }

    applyAutoDamage(loly: Loly): void {
        this.applyDamage(loly, this.player.data.autoClickDamage);
    }

    private applyDamage(loly: Loly, damage: number): void {
        if (!loly) return;
        loly.currentHealth = Math.max(0, loly.currentHealth - damage);
    }
}