import React, {Component} from 'react'
import './card.scss'
import Status from './Status'
import geoEn from './geo-en.png'
import geoDis from './geo-dis.png'
import secureImg from './lock.png'

export default class PaymentCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    handleStatusChange(){
        this.props.onStatusChange('success')
    }

    render(){
        //const geoImg = this.props.geoEn ? geoEn : geoDis;
        return(
                <div className="card">
                    <div className="card__info">
                        <Status activeItem={3}/>
                        <form>
                            <h1>Payment</h1>
                            <p className="pay-secure"><img src={secureImg}></img>This is a secure 128-bit SSL encrypted payment</p>
                            <h2>Cardholder Name</h2>
                            <input type="text" placeholder="Name as it appears on your card" required />
                            <h2>Card Number</h2>
                            <input type="text" placeholder="XXXX XXXX XXXX XXXX XXXX" required />
                            <div className="card-attributes">
                                <div className="card-attributes__expdate">
                                    <h2>Expire Date</h2>
                                    <div> <input type="text" placeholder="MM / YY" required />  </div>
                                </div>
                                <div className="card-attributes__seccode">
                                    <h2>Security Code</h2>
                                    <div> <input type="text" required />  </div>
                                </div>
                            </div>
                            <input type="submit" onClick={this.handleStatusChange} value="Pay Securely" />
                        </form>
                    </div>
                    <div className="card__order-summary">Summary</div>
                </div>
        )
    }
}