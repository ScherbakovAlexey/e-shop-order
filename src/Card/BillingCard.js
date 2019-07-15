import React, {Component} from 'react'
import './card.scss'
import Status from './Status'
import geoEn from './geo-en.png'
import geoDis from './geo-dis.png'

export default class BillingCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            countrySelectActive: false
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    handleSelectChange(){
        this.setState({
            countrySelectActive: true
        });
    }

    handleStatusChange(){
        this.props.onStatusChange('payment')
    }

    render(){
        const geoImg = this.props.geoEn ? geoEn : geoDis;
        const options = [];
        if (this.props.countries) this.props.countries.forEach((item,index)=>{
            if (typeof item == 'string')
            options.push(<option className="option-enabled" key={index}>{item}</option>);
        });
        const selectClassName = this.state.countrySelectActive ? 'select-en' : 'select-dis';
        return(
                <div className="card">
                    <div className="card__info">
                        <Status activeItem={2}/>
                        <form>
                            <h1>Billing Information <span className='biling__same'>Same as shipping</span></h1>
                            <h2>Billing Contact</h2>
                            <input type="text" placeholder="Full Name" required />
                            <input type="text" placeholder="Email Address" required />
                            <h2>Billing Address</h2>
                            <input type="text" placeholder="Street Address" required />
                            <input type="text" placeholder="Apt, Suite, Bldg, Gate Code (optional)" />
                            <div className="city"> <input type="text" placeholder="City" required /> <img src={geoImg}></img> </div>
                            <div className="country"><select className={selectClassName} onChange={this.handleSelectChange} required>
                                <option className="option-disabled" selected="selected" disabled>Country</option>
                                {options}
                                </select>
                                <input type="text" placeholder="ZIP" required /></div>
                            <input type="submit" onClick={this.handleStatusChange} value="Continue" />
                        </form>
                    </div>
                    <div className="card__order-summary">Summary</div>
                </div>
        )
    }
}