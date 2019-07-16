import React, {Component} from 'react'
import './styles/card.scss'
import Summary from './Summary'

export default class SuccessCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    render(){
        const orderNum = Math.round(Math.random()*1000000000);
        return(
                <div className="card">
                    <div className="card__info">
                        <div className="card-success">
                            <h1>Thank you for your order!</h1>
                            <strong>Order number is: {orderNum}</strong>
                            <p>You will receive an email confirmation shortly to 
                            <span className="email"> {this.props.email}</span></p>
                            <p>Estimated delivery Day is<br/>
                            <strong>Friday 1st April 2016</strong></p>
                            <div onClick={()=>{window.print();}}className="print">Print Recipe</div>
                        </div>
                    </div>
                    <div className="card__order-summary">
                        <Summary disabled={true}/>
                    </div>
                </div>
        )
    }
}