import React, {Component} from 'react'
import Item from './Item'
import './styles/summ.scss'
import item1 from './img/item1.png'
import item2 from './img/item2.png'
import item3 from './img/item3.png'

export default class Summary extends Component {
    constructor(props){
        super(props)
        this.state = {
            images: [item1, item2, item3],
            names: ['The Chelsea Boot','The Twill Snap Backpack','The Twill Zip Tote'],
            details: ['Black','Reverse Denim + Brown leather','Reverse Denim + Black leather'],
            quanities: [1,1,1],
            prices: [235,65,48]
        }
    }

    render(){
        const items = this.state.names.map((item,index)=>{
            return <Item key={index}
                         img={this.state.images[index]} 
                         name={item} 
                         details={this.state.details[index]} 
                         quantity={this.state.quanities[index]} 
                         price={this.state.prices[index]} />
        });
        const disabledClassName = this.props.disabled ? "summary-disabled" : "summary";
        return(
                <div className={disabledClassName}>
                    <div className="summary__header"><h2>Order Summary</h2><span>edit order</span></div>
                    {items}
                    {/* <Item   img={this.state.images[0]} 
                            name={this.state.names[0]} 
                            details={this.state.details[0]} 
                            quantity={this.state.quanities[0]} 
                            price={this.state.prices[0]} /> */}
                    <div className="subtotal">
                        <span>Subtotal</span><span>$398</span>
                    </div>
                    <div className="subtotal">
                        <span>Shipping</span><span>Free</span>
                    </div>
                    <div className="subtotal">
                        <span>Taxes</span><span>$12.12</span>
                    </div>
                    <hr/>
                    <div className="total">
                        <span>Total</span><span>$410.12</span>
                    </div>
                    <div className="terms-and-cond">All purchases are subject to our <span>Terms and Conditions</span></div>
                </div>
        )
    }
}