import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import Routing from "./Routing";


ReactDOM.render(<Routing/>, document.querySelector('#root'));

serviceWorker.unregister();




