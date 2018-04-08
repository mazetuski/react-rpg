// Dependencies
import React, {Component} from 'react';
import { characters, monsters, critMultiplier, firstLvlExp, STATE_PLAY, STATE_GAME_OVER } from '../utils/constants';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: null,
            name: props.match.params.name,
            monster: null,
            turn: true,
            nextLvl: firstLvlExp,
            gameState: STATE_PLAY
        }
    }

    componentWillMount(){
        characters.map(character => {
            if (character.characterClass === this.props.match.params.type){
                this.state.character = character;
            }
        });
        this.state.monster = monsters[0];
        this.state.monster.class = "Monstruo débil";
        this.state.playInterval = setInterval(this.play, 1000);
    };

    /**
     * Function for change turn
     */
    changeTurn = () => {
        this.setState({turn: !this.state.turn});
    };

    /**
     * Function for do all actions in one turn
     */
    turnActions = () => {
        // initialize variables
        let monsterChanged = this.state.monster;
        let character = this.state.character;

        if(this.state.turn){
            monsterChanged.vida = this.attack(monsterChanged, character.ataque, character.critico);
        }else{
            character.vida = this.attack(character, monsterChanged.ataque, monsterChanged.critico);
        }

        this.setState({
            monster: {...this.state.monster, monsterChanged},
            character: {...this.state.character, character}
        });
        this.changeTurn();
    };

    /**
     * Function for play game
     */
    play = () =>{
        // Check if game over
        if(this.state.gameState === STATE_GAME_OVER) return;
        // Do actions in turn
        this.turnActions();
        // Check if one character die
        if(this.state.monster.vida <=0 || this.state.character.vida <= 0){
            clearInterval(this.state.playInterval);
        }
        // Do actions when combat end
        if(this.state.character.vida<=0){
            this.gameOver();
        }else if(this.state.monster.vida <=0){
            this.winCombat();
        }

    };

    gameOver = () =>{
        this.setState({gameState: STATE_GAME_OVER});
        alert("Game over");
    };

    winCombat = () => {

    };

    handleLevel = () => {
        let character = this.state.character;
        let monster = this.state.monster;
        let nextLvl = this.state.nextLvl;
        let expDiff = nextLvl - monster.exp;
        // TODO: RESTAR EXPDIFF
        while(expDiff <= 0){
            nextLvl *= 2;
            expDiff = nextLvl - monster.exp;
            character.lvl++;
        }

        this.setState({
            character: {...this.state.character, character},
            nextLvl: nextLvl
        });
    };


    /**
     * Function for attack
     * @param objective
     * @param pointsAttack
     * @param crit
     * @returns {number} Objective health
     */
    attack = (objective, pointsAttack, crit) => {
        let health = objective.vida;
        // Check if is crit
        let isCrit = Math.random() * 100;
        console.log(isCrit);
        // if is crit multiplier
        isCrit > crit ? isCrit = false : isCrit = true;
        if(isCrit) pointsAttack *= critMultiplier;
        // get damage
        let damage = pointsAttack - objective.defensa;
        console.log(isCrit);
        // if damage more tahn 0 then attack
        if (damage > 0){
            health -= damage;
        }
        // If health less than 0 then put in 0
        if(health < 0) health = 0;

        return health;

    }

    render() {
        return (
            <div>
                <div className="col-md-2 text-left mt-2">
                    <h4>Nombre: {this.state.name}</h4>
                    <h4>Clase: {this.state.character.characterClass}</h4>
                    <h4>Vida: {this.state.character.vida}</h4>
                    <h4>Ataque: {this.state.character.ataque}</h4>
                    <h4>Defensa: {this.state.character.defensa}</h4>
                </div>
                <div className="col-md-8">

                </div>
                <div className="col-md-2 text-left mt-2">
                    <h4>Nombre: {this.state.monster.name}</h4>
                    <h4>Clase: {this.state.monster.class}</h4>
                    <h4>Vida: {this.state.monster.vida}</h4>
                    <h4>Ataque: {this.state.monster.ataque}</h4>
                    <h4>Defensa: {this.state.monster.defensa}</h4>
                </div>
            </div>
        );
    }
}

export default Game;