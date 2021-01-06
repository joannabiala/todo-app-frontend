import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import App from "./App";


ReactDOM.render(<App/>, document.querySelector('#root'));

serviceWorker.unregister();




