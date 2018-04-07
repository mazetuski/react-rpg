// Dependencies
import React, { Component } from 'react';

class CharacterInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            type: props.match.params.type,
            name: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.name){
            this.props.history.push(`/game/${this.state.type}/${this.state.name}`);
        }
    }

    render(){
        return(
            <form className="col-xs-12 mt-2" onSubmit={this.handleSubmit}>
                <h3>Has elegido la clase: {this.state.type}</h3>
                <div className="form-group col-md-offset-4 col-md-4 mt-2">
                    <label>Nombre</label>
                    <input type="text" className="form-control" id="Nombre" value={this.state.name} onChange={this.handleChange}/>
                </div>
                <div className="col-xs-12 mt-2">
                    <input type="submit" value="Crear personaje" className="btn btn-info" />
                </div>
            </form>
        )
    };
}

export default CharacterInfo;