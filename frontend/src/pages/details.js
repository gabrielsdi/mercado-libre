import React, { Component } from 'react';
import '../styles/SearchBar.scss';

class Details extends Component {  

  idPrueba = "MLA741464531";
  itemDetail;
  
  componentDidMount() {
    var { id } = this.props.match.params
    console.log("el id que viene por parametro ", id);  
    this.getDetail(id);
    
 }

 getDetail(id){

    var url = "http://localhost:3030/api/item/" + id + "/description";
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let detail = data; 
        console.log("Detalle: ", detail);                  
  
        detail = <li key={detail.date_created}>{detail.plain_text}</li>;
        this.itemDetail = detail;
        this.setState({itemDetail: this.itemDetail});
        
    })
} 
  
  render(){
    console.log("la id que viene en el render ", this.id);
    return (
        <div className="SearchBar">       
          <p>Mi ID</p>     
          <p>{this.itemDetail}</p>    
        </div>   
      );
   }
    
}

export default Details;

