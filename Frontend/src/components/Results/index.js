//Dependencies
import React, {Component} from 'react'
import { Link } from 'react-router-dom';

//Assets
import '../Global/css/Results.scss';


const queryString = require('query-string');


class Results extends Component{
    listItems;
    ItemsContainer;
    query;
    resultNotFoundErrorMSG = "No se encontraron resultados para su busqueda";  
    
    componentDidMount(){
        this.init();
    }

      componentDidUpdate(){
        this.init();
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

      init(){          
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

               this.listItems.length = 4;


              // this.listItems = result.map((d) =>
              //   <li className="item-container" key={d.id} >
              //     <div>
              //       <img src={d.thumbnail}></img>
              //       <div className="item-description">
              //         <p>$ {d.price}</p>
              //         <Link to={'/items/' + d.id}>
              //         <a href="">{d.title}</a>
              //         </Link>
              //       </div>
              //        </div>
              //   </li>);
              // //Show only 4 items
              
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
        console.log("renderiza");        
        return (
          <div>{this.ItemsContainer}</div>
        );
      }
}

export default Results;