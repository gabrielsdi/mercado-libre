import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import SearchBar from './../pages/SearchBar';
import Results from './../pages/Results';
const Routes = () => (
    <Router>
            <Route exact path="/" component={SearchBar}/>
            <Route path="/item" component={Results}/>
            {/* <Route path="/item:query" component={Results}/> */}
    </Router>
);

export default Routes;