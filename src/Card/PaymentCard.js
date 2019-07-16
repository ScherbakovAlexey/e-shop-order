import React, {Component} from 'react'
import './styles/card.scss'
import Status from './Status'
import Summary from './Summary'
import secureImg from './img/lock.png'
import creditCardType from 'credit-card-type'
import visa from './img/visa.png'

export default class PaymentCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            nameValid: '',
            card: '4012888888881881',
            cardValid: '',
            cardType: '',
            expDate: '',
            expDateValid: '',
            secCode: '',
            secCodeValid: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onNameChange =this.onNameChange.bind(this);
        this.onCardChange =this.onCardChange.bind(this);
        this.onExpDateChange =this.onExpDateChange.bind(this);
        this.onSecCodeChange =this.onSecCodeChange.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
       if (this.state.nameValid && this.state.cardValid && this.state.expDateValid &&
           this.state.secCodeValid){
               this.props.onStatusChange('success');
           } else {
               this.setState({
                   nameValid: !this.state.nameValid ? false : true,
                   cardValid: !this.state.cardValid ? false : true,
                   expDateValid: !this.state.expDateValid ? false : true,
                   secCodeValid: !this.state.secCodeValid ? false : true
               });
           }
    }

    onNameChange(e){
        if (e.target.value.length > 2){
            this.setState({nameValid: true});
        } else {
            this.setState({nameValid: false});
        }
    }

    onCardChange(e){
        const card =  /^(\d{4}[- ]){3}\d{4}|\d{16}$/;
        if (e.target.value.match(card)){
            let type = '';
            if (creditCardType(e.target.value).length) type = creditCardType(e.target.value)[0].type;
            //console.log('type: ',type);
            this.setState({
                card: e.target.value,
                cardValid: true,
                cardType: type
            });
        } else {
            this.setState({
                card: e.target.value,
                cardValid: false,
                cardType: ''
            });
        }
    }

    onExpDateChange(e){
        const date = /^\d{2}\/\d{2}$/;
        let value = (e.target.value.length === 2) ? e.target.value + '/' : e.target.value;
        if (value.match(date)){
            this.setState({
                expDate: value,
                expDateValid: true
            });
        } else {
            this.setState({
                expDate: value,
                expDateValid: false
            });
        }
    }

    onSecCodeChange(e){
        if (e.target.value.length === 3){
            this.setState({secCodeValid: true});
        } else {
            this.setState({secCodeValid: false});
        }
    }

    render(){
        const cardImg = visa; //this.state.cardType === 'visa' ? visa : '';
        const imgVisible = this.state.cardType === 'visa' ? 'img-visible' : 'img-hidden';
        //console.log('CARD: ', creditCardType(this.state.card));
        return(
                <div className="card">
                    <div className="card__info">
                        <Status activeItem={3}/>
                        <form>
                            <h1>Payment</h1>
                            <p className="pay-secure"><img src={secureImg} alt='img'></img>This is a secure 128-bit SSL encrypted payment</p>
                            <h2>Cardholder Name</h2>
                            <input type="text" placeholder="Name as it appears on your card" required
                                onChange={this.onNameChange} 
                                className={this.state.nameValid===false?'input-invalid':'input-valid'} />
                            <h2>Card Number</h2>
                            <div className="input-with-img">
                                <input type="number" placeholder="XXXX XXXX XXXX XXXX XXXX" required 
                                    onChange={this.onCardChange} 
                                    className={this.state.cardValid===false?'input-invalid':'input-valid'}/>
                                <img src={cardImg} className={imgVisible} alt='img'></img> 
                            </div>
                            <div className="card-attributes">
                                <div className="card-attributes__expdate">
                                    <h2>Expire Date</h2>
                                    <div> <input type="text" placeholder="MM / YY" required 
                                            value = {this.state.expDate}
                                            maxLength = "5"
                                            onChange={this.onExpDateChange} 
                                            className={this.state.expDateValid===false?'input-invalid':'input-valid'}/> 
                                    </div>
                                </div>
                                <div className="card-attributes__seccode">
                                    <h2>Security Code</h2>
                                    <div> <input type="number" required 
                                        onChange={this.onSecCodeChange} 
                                        className={this.state.secCodeValid===false?'input-invalid':'input-valid'}/>  
                                    </div>
                                </div>
                            </div>
                            <input type="submit" onClick={this.handleSubmit} value="Pay Securely" />
                        </form>
                    </div>
                    <div className="card__order-summary">
                        <Summary disabled={false}/>
                    </div>
                </div>
        )
    }
}