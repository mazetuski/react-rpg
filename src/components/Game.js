// Dependencies
import React, {Component} from 'react';
import {
    characters,
    baseMonster,
    monsters,
    critMultiplier,
    firstLvlExp,
    STATE_PLAY,
    STATE_GAME_OVER,
    STATE_PAUSE,
    upgradeSkill
} from '../utils/constants';
import Modal from 'react-modal';
import {Link} from 'react-router-dom'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: null,
            name: props.match.params.name,
            monster: null,
            turn: true,
            nextLvl: firstLvlExp,
            gameState: STATE_PLAY,
            upgrade: false,
            upgradeChoose: null,
            kills: 0,
            text: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let character = this.state.character;
        // Upgrade skills
        switch (this.state.upgradeChoose) {
            case "ataque":
                character.ataque += (character.upgradePoints * upgradeSkill);
                break;
            case "defensa":
                character.defensa += (character.upgradePoints * upgradeSkill);
                break;
            case "vida":
                character.vida += (character.upgradePoints * upgradeSkill);
                break;
        }
        // reset upgrade points
        character.upgradePoints = 0;

        this.setState({
            character: {...this.state.character, character},
            upgrade: false,
            upgradeChoose: null,
            gameState: STATE_PLAY
        });

        this.resetGameMonster();
    }

    /**
     * Function for generate monster and restart game
     */
    resetGameMonster = () => {
        this.generateMonster();
        this.state.playInterval = setInterval(this.play, 2000);
    };

    handleChange(event) {
        this.setState({upgradeChoose: event.target.value});
    }

    componentWillMount() {
        characters.map(character => {
            if (character.characterClass === this.props.match.params.type) {
                this.state.character = character;
            }
        });
        this.state.character.name = this.state.name;
        this.state.monster = monsters[0];
        this.state.monster.class = "Monstruo débil";
        this.state.playInterval = setInterval(this.play, 2000);
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

        if (this.state.turn) {
            monsterChanged.vida = this.attack(monsterChanged, character);
        } else {
            character.vida = this.attack(character, monsterChanged);
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
    play = () => {
        // Check if game over
        if (this.state.gameState === STATE_GAME_OVER) return;
        // Do actions in turn
        this.turnActions();
        // Check if one character die
        if (this.state.monster.vida <= 0 || this.state.character.vida <= 0) {
            clearInterval(this.state.playInterval);
        }
        // Do actions when combat end
        if (this.state.character.vida <= 0) {
            this.gameOver();
        } else if (this.state.monster.vida <= 0) {
            this.setState({gameState: STATE_PAUSE});
            this.winCombat();
        }

    };

    gameOver = () => {
        this.setState({gameState: STATE_GAME_OVER});
    };

    winCombat = () => {
        this.handleLevel();
        this.changeTurn();
    };

    /**
     * Function for change level of character
     */
    handleLevel = () => {
        let character = this.state.character;
        let monster = this.state.monster;
        let nextLvl = this.state.nextLvl;
        let expDiff = nextLvl - monster.exp;
        let upgrade = this.state.upgrade;
        if (expDiff > 0) {
            monster.exp -= nextLvl;
        }
        // get new lvls
        while (expDiff <= 0) {
            monster.exp -= nextLvl;
            nextLvl *= 2;
            expDiff = nextLvl - monster.exp;
            // level up and upgradePoints up
            character.lvl++;
            character.upgradePoints++;
            // Show modal for upgrade
            if (!upgrade) {
                upgrade = true;
            }
        }

        nextLvl = expDiff;

        this.setState({
            character: {...this.state.character, character},
            nextLvl: nextLvl,
            upgrade: upgrade,
            kills: this.state.kills + 1
        });

        // New monster if not need update
        if (!upgrade) {
            this.resetGameMonster();
        }
    };

    /**
     * Function for generate new Monster
     */
    generateMonster = () => {
        let monster = this.state.monster;
        let kills = this.state.kills;
        monster.vida = baseMonster.vida + (kills * 5);
        monster.ataque = baseMonster.ataque + (kills * 3);
        monster.defensa = baseMonster.defensa + kills;
        monster.exp = baseMonster.exp + (kills * 4);
        this.setState({
            monster: monster
        });

        this.addText("NUEVO MONSTRUO EN LA SALA");
    };


    /**
     * Function for attack
     * @param objective
     * @param attacker
     * @returns {number} Objective health
     */
    attack = (objective, attacker) => {
        let health = objective.vida;
        let pointsAttack = attacker.ataque;
        let crit = attacker.critico;
        let text = "";
        // Check if is crit
        let isCrit = Math.random() * 100;
        // if is crit multiplier
        isCrit > crit ? isCrit = false : isCrit = true;
        if (isCrit) {
            pointsAttack *= critMultiplier;
            text += "CRITICO! ";
        }
        // get damage
        let damage = pointsAttack - objective.defensa;
        // if damage more than 0 then attack
        if (damage > 0) {
            health -= damage;
        }

        // Add text to description
        text += attacker.name + " inflinge <b>" + damage + "</b> de daño";
        this.addText(text, 'text-green');

        // If health less than 0 then put in 0
        if (health < 0) {
            health = 0;
            this.addText(objective.name + " ha muerto");
        }

        return health;

    };

    /**
     * Function for add text
     * @param text
     * @param classes
     */
    addText = (text, classes) => {
        let classname = "";
        if (classes) {
            classname += classes;
        }
        let textState = "<p className='" + classname + "'>" + text + "</p>";
        this.setState({text: [textState, ...this.state.text]});
        if (this.state.text.length < 8) return;
        while (this.state.text.length > 8) {
            this.state.text.pop();
        }

    };

    render() {
        return (
            <div>
                <div className="col-md-12">
                    <div className="col-md-2 col-md-offset-4 text-left mt-2">
                        <img src="" alt=""/>
                        <h4>Nombre: {this.state.name}</h4>
                        <h4>Clase: {this.state.character.characterClass}</h4>
                        <h4>Vida: {this.state.character.vida}</h4>
                        <h4>Ataque: {this.state.character.ataque}</h4>
                        <h4>Defensa: {this.state.character.defensa}</h4>
                        <h4>Level: {this.state.character.lvl}</h4>
                        <h4>Next level: {this.state.nextLvl} Exp</h4>
                    </div>
                    <div className="col-md-2 text-left mt-2">
                        <h4>Nombre: {this.state.monster.name}</h4>
                        <h4>Clase: {this.state.monster.class}</h4>
                        <h4>Vida: {this.state.monster.vida}</h4>
                        <h4>Ataque: {this.state.monster.ataque}</h4>
                        <h4>Defensa: {this.state.monster.defensa}</h4>
                        <h4>Exp: {this.state.monster.exp}</h4>
                    </div>
                </div>
                <div className="col-md-12 mt-2">
                    {this.state.text.map(e =>
                        <div dangerouslySetInnerHTML={{__html: e}}/>
                    )}
                </div>
                <Modal
                    isOpen={this.state.upgrade}
                    contentLabel="Example Modal"
                    style={customStyles}
                >
                    <form onSubmit={this.handleSubmit} className="text-center">
                        <h3>{this.state.character.upgradePoints} level up</h3>
                        <h4>¿Qué habilidades quieres subir?</h4>
                        <label className="radio-inline"><input type="radio" name="optradio" value="vida"
                                                               onChange={this.handleChange}/>Salud</label>
                        <label className="radio-inline"><input type="radio" name="optradio"
                                                               value="ataque"
                                                               onChange={this.handleChange}/>Ataque</label>
                        <label className="radio-inline"><input type="radio" name="optradio"
                                                               value="defensa"
                                                               onChange={this.handleChange}/>Defensa</label>
                        <div className="col-xs-12 mt-2">
                            <input type="submit" value="Upgrade" className="btn btn-dark"/>
                        </div>
                    </form>
                </Modal>
                <Modal
                    isOpen={this.state.gameState === STATE_GAME_OVER}
                    contentLabel="Example Modal"
                    style={customStyles}
                >
                    <h3>Game Over</h3>
                    <div className="text-center">
                        <Link className="btn btn-info" to='/'>Volver</Link>
                    </div>
                </Modal>
            </div>

        );
    }
}

export default Game;