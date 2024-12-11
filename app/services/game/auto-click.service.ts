import { DamageService } from './damage.service';

export class AutoClickService {
  private interval: number;

  constructor(private damageService: DamageService) {}

  start(): void {
    this.interval = setInterval(() => {
      this.damageService.applyAutoDamage(this.currentLoly);
    }, 1000);
  }

  stop(): void {
    clearInterval(this.interval);
  }
}