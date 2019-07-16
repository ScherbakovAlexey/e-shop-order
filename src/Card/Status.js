import React, {Component} from 'react'
import './styles/card.scss'
import angle from './img/angle.png'

export default class Card extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        return(
            <div className='status'>
                <span className={this.props.activeItem === 1 ? 'active' : 'base'}>Shipping</span>
                <img src={angle} alt='img'></img>
                <span className={this.props.activeItem === 2 ? 'active' : 'base'}>Billing</span>
                <img src={angle} alt='img'></img>
                <span className={this.props.activeItem === 3 ? 'active' : 'base'}>Payment</span>
            </div>
        )
    }
}