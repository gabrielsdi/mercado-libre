import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Routes from './routes/routes';

ReactDOM.render(<Routes />, document.getElementById('search-bar'));

serviceWorker.unregister();
