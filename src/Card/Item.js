import React, {Component} from 'react'
import './styles/summ.scss'

export default class Summary extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        
        return(
            <React.Fragment>
                <div className="item">
                    <div className="item__left">
                        <img src={this.props.img} alt='img'></img>
                        <div className="item__left__details">
                            <p className="item__left__details_name">{this.props.name}</p>
                            <p className="item__left__details_details">{this.props.details}</p>
                            <p className="item__left__details_quantity">Quantity: {this.props.quantity}</p>
                        </div>
                    </div>
                    <div className="item__right">
                        <p className="item__right_price">${this.props.price}</p>
                    </div>
                </div>
                <hr />
                </React.Fragment>
        )
    }
}