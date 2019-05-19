import React, { Component } from 'react';
import '../styles/SearchBar.scss';
const queryString = require('query-string');


class Result extends Component {  

  listItems;
  query;
  resultNotFoundErrorMSG = "No se encontraron resultados para su busqueda";

  componentDidMount() {
    var props = this.props.location.search;
    var searchQuery = queryString.parse(props);
    this.query = searchQuery.search;
    this.search(this.query);
 }
  search(query){
    console.log("la query que me llega", query);
    var url = "http://localhost:3030/api/query/" + query;
    fetch(url)
    .then((response) => {

        if(response.status != 200)          
          return;
              
        return response.json();
    })
    .then((data) => {
      if(data){
        let result = data.results;  
          this.listItems = result.map((d) => 
          <div key={d.id}>
            <li>{d.title}</li>          
            <a href="" onClick={() => this.navigateToDetailsPage(d.id)}>Ver detalle</a>
          </div>);
  
          //Show only 4 items
          this.listItems.length = 4;
          this.setState({listItems: this.listItems})
          console.log("Items: ", result); 
        }  
        else{
          this.listItems = this.resultNotFoundErrorMSG;
          this.setState({listItems: this.listItems})
        } 
                         
    })
}   

navigateToDetailsPage = (id) => {
  this.props.history.push({pathname: '/items/' + id})
}

  
  
  render(){ 
    console.log("renderiza");
    return (
        <div className="SearchBar">        
          <p>{this.listItems}</p>    
        </div>   
      );
   }
    
}

export default Result;

