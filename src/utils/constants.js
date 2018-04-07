export const characters = [
    {
        characterClass: "Guerrero",
        characterDescription: "Los guerreros tienen más salud y aguantan más en combate pero tienen poca movilidad",
        vida: 150,
        ataque: 60,
        defensa: 10,
        critico: 1
    },
    {
        characterClass: "Asesino",
        characterDescription: "Los asesinos hacen una gran cantidad de daño y tienen mucha movilidad pero apenas tienen salud",
        vida: 80,
        ataque: 110,
        defensa: 6,
        critico: 7
    },
    {
        characterClass: "Mago",
        characterDescription: "Tienen gran cantidad de daño y atacan a distancia pero tienen muy poca movilidad",
        vida: 100,
        ataque: 90,
        defensa: 8,
        critico: 4
    }
];

export const monsters = [
    {
        name: "Easy monster",
        vida: 60,
        ataque: 10,
        defensa: 1,
        critico: 1
    }
];

export const critMultiplier = 2.5;