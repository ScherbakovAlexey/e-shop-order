import React, {Component} from 'react'
import './styles/card.scss'
import ShippingCard from './ShippingCard'
import BillingCard from './BillingCard'
import PaymentCard from './PaymentCard'
import SuccessCard from './SuccessCard'

export default class Card extends Component {
    constructor(props){
        super(props)
        this.state = {
            status: 'shipping',//'success'//'payment'//'billing'//'shipping'
            email: '',
            shippingState: {}
        }
        this.statusChange = this.statusChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
    }

    statusChange(status,state){
        //console.log('STATE: ', state);
        this.setState({
            status: status,
            shippingState: state
        });
        if (status === 'success') this.props.onSuccess();
    }
    emailChange(email){
        this.setState({
            email: email
        });
    }

        render(){
            switch (this.state.status){
                case 'shipping': return <ShippingCard info={this.props.info} onStatusChange={this.statusChange}/>
                case 'billing': return <BillingCard geoEn={this.props.info.geolocationEnabled} countries={this.props.info.countries} onStatusChange={this.statusChange} info={this.state.shippingState} onEmailChange={this.emailChange}/>
                case 'payment': return <PaymentCard onStatusChange={this.statusChange}/>
                case 'success': return <SuccessCard email={this.state.email} onStatusChange={this.statusChange}/>
                default: return <ShippingCard info={this.props.info} onStatusChange={this.statusChange}/>
            }
        }
}