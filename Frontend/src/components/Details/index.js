//Dependencies
import React, { Component } from 'react'

//Assets
import '../Global/css/Details.scss'

class Details extends Component {

    itemDetail;
    itemData;
    itemImg;
    itemShortDesc;
    itemDesc;

    componentDidMount() {
        const { id } = this.props.match.params
        console.log("el id que viene por parametro ", id);
        this.getDetail(id);
        this.getItemData(id);
    }

    getDetail(id) {
        var url = "http://localhost:3030/api/item/" + id + "/description";
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let detail = data;
                console.log("Detalle: ", detail);

                detail = <p key={detail.date_created}>{detail.plain_text}</p>;
                this.itemDetail = detail;
                this.setState({ itemDetail: this.itemDetail });
            })
    }

    getItemData(id) {
        var url = "http://localhost:3030/api/item/" + id;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.itemData = { price: data.base_price, title: data.title, condition: data.condition, soldQuantity: data.sold_quantity, img: data.secure_thumbnail };
                if(this.itemData && this.itemData.condition == "new"){
                    this.itemData.condition = "Nuevo"
                }
                else{
                    this.itemData.condition = "Usado"
                }

                let img = <img className="item-img" src={this.itemData.img} alt={this.itemData.title}></img>;
                let shorDesct =
                    <div className="short-desc">
                        <div>
                        <p>{this.itemData.condition} - {this.itemData.soldQuantity} vendidos</p>
                        <h5>{this.itemData.title}</h5>
                        <h2>$ {this.itemData.price}</h2>
                        </div>
                        <button className="btn btn-primary buy-button">Comprar</button>
                    </div>
                console.log("Item: ", this.itemData);
                this.itemImg = img;
                this.itemShortDesc = shorDesct;
                this.setState({ itemImg: this.itemImg });
                this.setState({ itemShortDesc: this.itemShortDesc })

            })
    }

    render() {
        console.log("la id que viene en el render ", this.id);
        return (
            <div className="Details">
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
                            <h5>Descripción del producto</h5>
                            <p>{this.itemDetail}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Details;