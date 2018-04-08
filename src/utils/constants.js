export const characters = [
    {
        characterClass: "Guerrero",
        characterDescription: "Los guerreros tienen más salud y aguantan más en combate pero tienen poca movilidad",
        vida: 150,
        ataque: 60,
        defensa: 10,
        critico: 1,
        exp: 0,
        lvl: 1
    },
    {
        characterClass: "Asesino",
        characterDescription: "Los asesinos hacen una gran cantidad de daño y tienen mucha movilidad pero apenas tienen salud",
        vida: 80,
        ataque: 110,
        defensa: 6,
        critico: 7,
        exp: 0,
        lvl: 1
    },
    {
        characterClass: "Mago",
        characterDescription: "Tienen gran cantidad de daño y atacan a distancia pero tienen muy poca movilidad",
        vida: 100,
        ataque: 90,
        defensa: 8,
        critico: 4,
        exp: 0,
        lvl: 1
    }
];

export const monsters = [
    {
        name: "Easy monster",
        vida: 60,
        ataque: 10,
        defensa: 1,
        critico: 1,
        exp: firstLvlExp,
        lvl: 1
    }
];

export const critMultiplier = 2.5;

export const firstLvlExp = 20;

export const STATE_PLAY = 'PLAY';
export const STATE_GAME_OVER = 'GAMEOVER';