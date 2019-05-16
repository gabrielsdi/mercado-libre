import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchBar from './pages/SearchBar';
import * as serviceWorker from './serviceWorker';
import Routes from './routes/routes';

//ReactDOM.render(<SearchBar />, document.getElementById('search-bar'));
ReactDOM.render(<Routes />, document.getElementById('search-bar'));

serviceWorker.unregister();
