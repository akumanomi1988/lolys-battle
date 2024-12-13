import { DamageService } from './damage.service';
import { Loly } from '../../interfaces/models/loly.interface';

export class AutoClickService {
    private interval: number;
    private currentLoly: Loly | null = null;

    constructor(private damageService: DamageService) {}

    setCurrentLoly(loly: Loly): void {
        this.currentLoly = loly;
    }

    start(): void {
        if (this.interval) {
            this.stop();
        }

        this.interval = setInterval(() => {
            if (this.currentLoly && this.currentLoly.currentHealth > 0) {
                this.damageService.applyAutoDamage(this.currentLoly);
            }
        }, 1000);
    }

    stop(): void {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}