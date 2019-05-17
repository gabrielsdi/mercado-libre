import React, { Component } from 'react';
import '../styles/SearchBar.sass';
import { createHashHistory } from 'history'

var searchService;
var description = "";
var query;
export const history = createHashHistory();

class SearchBar extends Component {    
    
    handleQueryChange(e) {
        query = e.target.value;      
     }

     handleClick = () => {
        this.search(query);      
      }

    search(query){
        console.log("la query que me llega", query);
        var url = "http://localhost:3030/api/query/" + query;
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {            
            description = data;
            console.log("description: ", description);
            this.navigateToResultPage();         
        })
    }   

    navigateToResultPage = () => {
        this.props.history.push({pathname: '/item',state: {result : description}})
    }

   render(){
    return (
        <div className="SearchBar">
         <input id="search-bar" type="text" value={this.query} onChange={this.handleQueryChange}></input>
         <button onClick={this.handleClick}>Buscar</button>
         <p>{description}</p>
        </div>
      );
   }

    
}

export default SearchBar;

