import React, {Component} from 'react'
import './header.scss'
import icon from './icon.png'
import basketFull from './basket-full.png'
import basketEmpty from './basket-empty.png'

export default class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
        render(){
            const basketImg = this.props.basketEmpty ? basketEmpty : basketFull;
            return (
                <React.Fragment>
                <div className="header__border"></div>
                <div className="header">
                    <img className="header__icon" src={icon}></img>
                    Front-end Developer Test Task
                    <div className="header__basket">
                        cart
                        <img className="header__basket_full" src={basketImg}></img>
                    </div>
                </div>
                </React.Fragment>
            )
        }
}