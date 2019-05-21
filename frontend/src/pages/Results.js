import React, { Component } from 'react';
import '../styles/Results.scss';
const queryString = require('query-string');


class Result extends Component {


  listItems;
  ItemsContainer;
  query;
  resultNotFoundErrorMSG = "No se encontraron resultados para su busqueda";

  componentDidMount() {
    var props = this.props.location.search;
    var searchQuery = queryString.parse(props);
    this.query = searchQuery.search;
    this.search(this.query);
  }
  search(query) {
    console.log("la query que me llega", query);
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
          let result = data.results;
          this.listItems = result.map((d) =>
            <li className="item-container" key={d.id} >
              <div>
                <img src={d.thumbnail}></img>
                <div className="item-description">
                  <p>$ {d.price}</p>
                  <a href="" onClick={() => this.navigateToDetailsPage(d.id)}>{d.title}</a>
                </div>
                <p className="item-adress">{d.address.city_name}</p> </div>
            </li>);
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

  navigateToDetailsPage = (id) => {
    this.props.history.push({ pathname: '/items/' + id })
  }

  renderContainer() {
    this.ItemsContainer = <div>
      <div className="card items-card">
        <div className="card-body">
          <p>{this.listItems}</p>
        </div>
      </div>
    </div>

    this.setState({ ItemsContainer: this.ItemsContainer });
  }



  render() {
    console.log("renderiza");
    return (
      <div>{this.ItemsContainer}</div>
    );
  }

}

export default Result;

