// Dependencies
import React, {Component} from 'react';
import logo from './logo.svg';
import Characters from './components/Characters';
import './css/App.css';
import Main from './Main';

import { Link } from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <div className="row text-center">
                <header className="App-header col-12">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-info text-center">
                    <Link className="navbar-brand" to='/'>Home</Link>
                    <Link className="navbar-brand" to='/choose'>Characters</Link>
                </nav>
                <Main />
            </div>
        );
    }
}

export default App;
