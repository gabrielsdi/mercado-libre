//Dependencies
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

//Assets
import '../Global/css/Results.scss';

var Loader = require('react-loader');


const queryString = require('query-string');


class Results extends Component {
  listItems;
  itemsContainer;
  query;
  resultNotFoundErrorMSG = "No se encontraron resultados para su busqueda";

  constructor() {
		super();
	
		this.state = {
		  isLoaded: false
		};
	  }

  async componentDidMount() {
    this.init();
  }

  //Is not working correctly
  //   async componentDidUpdate(){    
  //     this.init();
  // }

  renderContainer() {
    this.itemsContainer = <div>
      <div className="card items-card">
        <div className="card-body">
          <p>{this.listItems}</p>
        </div>
      </div>      
    </div>

    this.setState({ isLoaded: true });
  }

  init() {
    this.setState({ itemsContainer: this.itemsContainer });
    var props = this.props.location.search;    
    var searchQuery = queryString.parse(props);
    this.query = searchQuery.search;
    this.search(this.query);
  }

  search(query) {
    var url = "http://localhost:3030/api/query/" + query;
    fetch(url)
      .then((response) => {

        if (response.status !== 200)
          return;

        return response.json();
      })
      .then((data) => {
        this.data = true;
        if (data) {
          let result = data.items[0];
          this.listItems = [];
          for (let i = 0; i < result.length; i++) {
            console.log(result[i]);
            this.listItems.push(
              <li className="item-container" key={result[i].id} >
                <div>
                  <img src={result[i].picture}></img>
                  <div className="item-description">
                    <p>$ {result[i].price.amount}</p>
                    <Link to={'/items/' + result[i].id}>
                      <a href="">{result[i].title}</a>
                    </Link>
                  </div>
                  <p className="item-adress">{result[i].address}</p>
                </div>
              </li>)
          }

          //Show only 4 items
          this.listItems.length = 4;
          this.setState({ listItems: this.listItems });
          console.log("Items: ", result);
          this.renderContainer();
        }
        else {
          this.listItems = this.resultNotFoundErrorMSG;
          this.setState({ listItems: this.listItems });
          this.renderContainer();
        }

      })
  }

  render() {   
    const { isLoaded } = this.state; 
    console.log("renderiza");
    return (
      <div>
         <div className="loader-wrapper">        
        <Loader loaded={isLoaded}>
          <div className="loaded-contents">{this.itemsContainer}</div>
        </Loader>
      </div>
      
      </div>
    );
  }
}

export default Results;