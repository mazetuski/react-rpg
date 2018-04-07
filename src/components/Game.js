// Dependencies
import React, {Component} from 'react';
import {characters} from '../utils/constants';
import {monsters} from '../utils/constants';
import { critMultiplier } from "../utils/constants";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: null,
            name: props.match.params.name,
            monster: null,
            turn: true
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

    play = () =>{
        this.turnActions();
        if(this.state.monster.vida <=0 || this.state.character.vida <= 0){
            clearInterval(this.state.playInterval);
        }
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
        if (damage > 0){
            health -= damage;
        }
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