// Dependencies
import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Character extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Link to={'/choosed/'+this.props.characterClass}>
                <div className="character-container col-sm-4">
                    <header>
                        <h3>{this.props.characterClass}</h3>
                    </header>
                    <div>
                        <p>{this.props.characterDescription}</p>
                    </div>
                </div>
            </Link>
        );
    }
}

export default Character;