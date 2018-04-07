import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap4alpha.min.css';
import './css/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
),document.getElementById('root'));
registerServiceWorker();
