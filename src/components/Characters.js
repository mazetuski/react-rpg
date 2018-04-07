import React, { Component } from "react";
import {characters} from '../utils/constants';
import Character from './Character';


class Characters extends Component{
    render(){
        return(
            <div className="col-12">
                {characters.map(character =>
                <Character key={Math.random()} characterClass={character.characterClass} characterDescription={character.characterDescription}/>
            )}
            </div>
        );
    }
}

export default Characters;