import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import SearchBar from './../pages/SearchBar';
import Results from './../pages/Results';
import Details from './../pages/details';
const Routes = () => (
    <Router>
            <Route exact path="/" component={SearchBar}/> 
            <Route exact path="/items" search="?search=:query" component={Results}/>
            <Route exact path="/items/:id" component={Details}/>
    </Router>
);

export default Routes;