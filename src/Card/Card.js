import React, {Component} from 'react'
import './card.scss'

export default class Card extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
        render(){
            return (
                <div className="card">
                    <div className="card__info">Info</div>
                    <div className="card__order-summary">Summary</div>
                </div>
            )
        }
}