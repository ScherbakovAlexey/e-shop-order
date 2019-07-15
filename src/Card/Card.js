import React, {Component} from 'react'
import './card.scss'
import Status from './Status'
import ShippingCard from './ShippingCard'
import BillingCard from './BillingCard'
import PaymentCard from './PaymentCard'
import SuccessCard from './SuccessCard'
import geoEn from './geo-en.png'
import geoDis from './geo-dis.png'

export default class Card extends Component {
    constructor(props){
        super(props)
        this.state = {
            status: 'shipping'//'success'//'payment'//'billing'//'shipping'
        }
        this.statusChange = this.statusChange.bind(this);
    }
    componentDidMount(){
        //document.getElementById('fullname_inp').setCustomValidity('Please enter recipient full name');
        // var inputs = document.getElementsByTagName('input'),
        // len = inputs.length,
        // i = 0,
        // cur = null,
        // errMsg = 'Please enter recipient';
        // for (i; i < len; i += 1) {
        // cur = inputs[i];
        //     if (cur.getAttribute('type') !== 'submit') {
        //         cur.setCustomValidity(errMsg + ' ' + cur.placeholder.toLowerCase());
        //     }
        // }
    }

    statusChange(status){
        this.setState({
            status: status
        });
        if (status == 'success') this.props.onSuccess();
    }

        render(){
           // const geoImg = this.props.info.geolocationEnabled ? geoEn : geoDis;
            switch (this.state.status){
                case 'shipping': return <ShippingCard geoEn={this.props.info.geolocationEnabled} countries={this.props.info.countries} onStatusChange={this.statusChange}/>
                case 'billing': return <BillingCard geoEn={this.props.info.geolocationEnabled} countries={this.props.info.countries} onStatusChange={this.statusChange}/>
                case 'payment': return <PaymentCard onStatusChange={this.statusChange}/>
                case 'success': return <SuccessCard email={this.props.info.email} onStatusChange={this.statusChange}/>
            }
          /*  return (
                <div className="card">
                    <div className="card__info">
                        <Status activeItem={1}/>
                        <form>
                            <h1>Shipping Info</h1>
                            <h2>Recipient</h2>
                            <input type="text" placeholder="Full Name" required />
                            <div className="daytime-phone"> <input type="text" placeholder="Daytime Phone" required /> <p> For delivery questions only </p> </div>
                            <h2>Address</h2>
                            <input type="text" placeholder="Street Address" required />
                            <input type="text" placeholder="Apt, Suite, Bldg, Gate Code (optional)" />
                            <div className="city"> <input type="text" placeholder="City" required /> <img src={geoImg}></img> </div>
                            <div className="country"><select required><option selected="selected" disabled>Country</option></select><input type="text" placeholder="ZIP" required /></div>
                            <input type="submit" />

                        </form>
                    </div>
                    <div className="card__order-summary">Summary</div>
                </div>
            )*/
        }
}