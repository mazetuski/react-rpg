//Dependencies
import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Characters from './components/Characters';
import Home from './Home';
import CharacterInfo from './components/CharacterInfo';
import Game from './components/Game';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/choose' component={Characters}/>
            <Route path='/choosed/:type' component={CharacterInfo}/>
            <Route path='/game/:type/:name' component={Game}/>
        </Switch>
    </main>
);

export default Main;