import React, { Component } from 'react';
import '../styles/SearchBar.sass';
import { createHashHistory } from 'history'

var searchService;
var description = "";
export const history = createHashHistory();

class SearchBar extends Component {    

    search(query){
        var url = "http://localhost:3030/api/query/zapatillas";
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            description = data.query;
            console.log("description: ", description);         
        })
    }   

    submitForm = () => {
        this.props.history.push('/item')
    }

   render(){
    return (
        <div className="SearchBar">
         <input id="search-bar" type="text"></input>
         <button onClick={this.submitForm.bind(this)}>Buscar</button>
         <p>{description}</p>
        </div>
      );
   }

    
}

export default SearchBar;

