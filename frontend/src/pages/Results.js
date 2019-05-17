import React, { Component } from 'react';
import '../styles/SearchBar.sass';



class Result extends Component {  

  result = this.props.location.state.result.results;
  listItems = this.result.map((d) => <li key={d.id}>{d.title}</li>);
  
  render(){
    console.log("los resultados de busqueda", this.result);

    return (
        <div className="SearchBar"> 
          <p>{this.listItems}</p>    
        </div>   
      );
   }
    
}

export default Result;

