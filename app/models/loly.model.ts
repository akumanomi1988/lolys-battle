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

export interface LolyDialogues {
  intro: string[];
  defeat: string[];
  victory: string[];
}

export class LolyModel {
  static generateLoly(playerLevel: number): Loly {
    const lolyTypes = [
      {
        id: 'tsundere',
        name: 'Tsundere-chan',
        imagePath: '~/assets/lolys/tsundere.png',
        dialogues: {
          intro: [
            "¡N-no es como si quisiera luchar contigo ni nada!",
            "¿Crees que puedes vencerme? ¡Qué atrevido!",
            "¡Hmph! Solo porque eres lindo no significa que seré suave contigo..."
          ],
          defeat: [
            "¡N-no es justo! ¡Solo ganaste porque me distraje!",
            "La próxima vez no será tan fácil... ¡baka!",
            "¡N-no creas que esto significa algo especial!"
          ],
          victory: [
            "¿Ves? ¡Te dije que no podrías vencerme!",
            "Tal vez deberías entrenar más... n-no es que me importe.",
            "¡Ja! ¿Quién es el débil ahora?"
          ]
        }
      },
      {
        id: 'yandere',
        name: 'Yandere-chan',
        imagePath: '~/assets/lolys/yandere.png',
        dialogues: {
          intro: [
            "¡Por fin nos encontramos! ♥",
            "No te preocupes, seré gentil... tal vez ♥",
            "¿Jugamos un juego divertido? ¡Será inolvidable!"
          ],
          defeat: [
            "¡Eres tan fuerte! ¡Me gustas aún más ahora! ♥",
            "¡Kyaaa! ¡No esperaba menos de ti!",
            "¡Esto hace que mi corazón lata más rápido! ♥"
          ],
          victory: [
            "Ahora eres todo mío... para siempre ♥",
            "¡Nadie más puede tenerte!",
            "¿No fue divertido? ¡Juguemos otra vez! ♥"
          ]
        }
      }
    ];

    const selectedType = lolyTypes[Math.floor(Math.random() * lolyTypes.length)];
    const baseHealth = 10 * Math.pow(1.1, playerLevel - 1);

    return {
      ...selectedType,
      level: playerLevel,
      maxHealth: Math.floor(baseHealth),
      currentHealth: Math.floor(baseHealth),
      coins: Math.floor(baseHealth * 0.5),
      experience: Math.floor(baseHealth * 0.3)
    };
  }

  static getRandomDialogue(dialogues: string[]): string {
    return dialogues[Math.floor(Math.random() * dialogues.length)];
  }
}