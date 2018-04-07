// Dependencies
import React, { Component } from 'react';

class CharacterInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            type: props.match.params.type
        }
    }

    render(){
        return(
            <div className="col-xs-12 mt-2">
                <h3>Has elegido la clase: {this.state.type}</h3>
                <div className="form-group col-md-offset-4 col-md-4 mt-2">
                    <label>Nombre</label>
                    <input type="text" className="form-control" id="Nombre"/>
                </div>
            </div>
        )
    };
}

export default CharacterInfo;