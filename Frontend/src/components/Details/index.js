//Dependencies
import React, { Component } from 'react'

//Assets
import '../Global/css/Details.scss'

//Plugins
var Loader = require('react-loader');

class Details extends Component {

    itemDetail;
    itemData;
    itemImg;
    itemShortDesc;
    itemDesc;
    itemContainer;

    constructor() {
        super();

        this.state = {
            isLoaded: false
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.getItemDetail(id);
    }

    getItemDetail(id) {
        var url = "http://localhost:3030/api/item/" + id;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let detail = data.item;

                this.itemDetail = <p id="item-description" aria-labelledby={detail.description}>{detail.description}</p>;

                this.itemData = { price: detail.price.amount, title: detail.title, condition: detail.condition, soldQuantity: detail.sold_quantity, img: detail.picture };

                if (this.itemData && this.itemData.condition === "new") {
                    this.itemData.condition = "Nuevo"
                }
                else if(this.itemData && this.itemData.condition === "used"){
                    this.itemData.condition = "Usado"
                }
                else {
                    this.itemData.condition = "No especificado"
                }

                let img = <img id="item-img" className="item-img" src={this.itemData.img} alt={this.itemData.title} aria-label="Imagen item"></img>;
                let shorDesc =
                    <div className="short-desc">
                        <div>
                            <p id="item-condition" aria-labelledby={this.itemData.condition}>{this.itemData.condition} - {this.itemData.soldQuantity} vendidos</p>
                            <h5 id="item-title" aria-labelledby={this.itemData.title}>{this.itemData.title}</h5>
                            <h2 id="item-price" aria-labelledby={this.itemData.price}>$ {this.itemData.price}</h2>
                        </div>
                        <button id="buy-button" aria-label="Comprar" className="btn btn-primary buy-button">Comprar</button>
                    </div>

                this.itemImg = img;
                this.itemShortDesc = shorDesc;
                this.setState({ itemImg: this.itemImg });
                this.setState({ itemShortDesc: this.itemShortDesc })
                this.setState({ itemDetail: this.itemDetail });
                this.renderContainer();
            })
    }

    renderContainer() {
        this.itemContainer = <div className="Details">
            <div className="card items-card">
                <div className="card-body">
                    <div class="row">
                        <div className="col-8">
                            {this.itemImg}
                        </div>
                        <div className="col-4"> {this.itemShortDesc}</div>
                    </div>
                    <div className="col-12">
                        <div className="item-desc">
                            <h5 aria-labelledby="Descripcion del producto">Descripción del producto</h5>
                            <p>{this.itemDetail}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        this.setState({ itemContainer: this.itemContainer });
        this.setState({ isLoaded: true });
    }

    render() {
        const { isLoaded } = this.state;
        return (
            <div className="loader-wrapper">
                <Loader loaded={isLoaded}>
                    <div className="loaded-contents">{this.itemContainer}</div>
                </Loader>
            </div>
        );
    }
}

export default Details;