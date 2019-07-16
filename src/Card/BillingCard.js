import React, {Component} from 'react'
import './styles/card.scss'
import Status from './Status'
import Summary from './Summary'
import geoEn from './img/geo-en.png'
import geoDis from './img/geo-dis.png'

export default class BillingCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            countrySelectActive: false,
            name: '',
            nameValid: '',
            email: '',
            emailValid: '',
            street: '',
            streetValid: '',
            address: '',
            addressValid: true,
            city: '',
            cityValid: '',
            country: 'Country',
            countryValid: '',
            zip: '',
            zipValid: '',
            formValid: ''
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onStreetChange = this.onStreetChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.onZipChange = this.onZipChange.bind(this);
        this.fillFields = this.fillFields.bind(this);
    }

    handleSelectChange(e){
        this.setState({
            country: e.target.value,
            countrySelectActive: true
        });
        this.setState({countryValid: true});
    }

    handleSubmit(e){
       e.preventDefault();
       if (this.state.nameValid && this.state.emailValid && this.state.streetValid &&
           this.state.addressValid && this.state.cityValid && this.state.countryValid && this.state.zipValid){
               this.props.onStatusChange('payment');
               this.props.onEmailChange(this.state.email);
           } else {
               this.setState({
                   nameValid: !this.state.nameValid ? false : true,
                   emailValid: !this.state.emailValid ? false : true,
                   streetValid: !this.state.streetValid ? false : true,
                   addressValid: !this.state.addressValid ? false : true,
                   cityValid: !this.state.cityValid ? false : true,
                   countryValid: !this.state.countryValid ? false : true,
                   zipValid: !this.state.zipValid ? false : true,
               });
           }
    }

    onNameChange(e){
        if (e.target.value.length > 2){
            this.setState({
                name: e.target.value,
                nameValid: true
            });
        } else {
            this.setState({
                name: e.target.value,
                nameValid: false
            });
        }
    }
    onEmailChange(e){
        const email = /\S+@\S+\.\S+/;
        if (e.target.value.match(email)){
            this.setState({
                email: e.target.value,
                emailValid: true
            });
        } else {
            this.setState({
                email: e.target.value,
                emailValid: false
            });
        }
    }
    onStreetChange(e){
        if (e.target.value.length > 2){
            this.setState({
                street: e.target.value,
                streetValid: true
            });
        } else {
            this.setState({
                street: e.target.value,
                streetValid: false
            });
        }
    }
    onAddressChange(e){
        this.setState({
            address: e.target.value,
            addressValid: true
        });
    }
    onCityChange(e){
        if (e.target.value.length > 2){
            this.setState({
                city: e.target.value,
                cityValid: true
            });
        } else {
            this.setState({
                city: e.target.value,
                cityValid: false
            });
        }
    }
    onZipChange(e){
        const zip = /^[0-9]{6}(?:-[0-9]{4})?$/;
        if (e.target.value.match(zip)){
            this.setState({
                zip: e.target.value,
                zipValid: true
            });
        } else {
            this.setState({
                zip: e.target.value,
                zipValid: false
            });
        }
    }

    fillFields(){
        this.setState({
            name: this.props.info.name,
            nameValid: true,
            street: this.props.info.street,
            streetValid: true,
            address: this.props.info.address,
            addressValid: true,
            city: this.props.info.city,
            cityValid: true,
            country: this.props.info.country,
            countryValid: true,
            countrySelectActive: true,
            zip: this.props.info.zip,
            zipValid: true
        });
    }

    render(){
        //console.log('NAME: ', this.props.info.name);
        const geoImg = this.props.geoEn ? geoEn : geoDis;
        const options = [];
        if (this.props.countries) this.props.countries.forEach((item,index)=>{
            if (typeof item == 'string')
            options.push(<option className="option-enabled" key={index}>{item}</option>);
        });
        const selectClassName = (this.state.countrySelectActive ? 'select-en' : 'select-dis') + ' ' +
                                (this.state.countryValid===false?'input-invalid':'input-valid');
        return(
                <div className="card">
                    <div className="card__info">
                        <Status activeItem={2}/>
                        <form>
                            <h1>Billing Information <span onClick={this.fillFields} className='biling__same'>Same as shipping</span></h1>
                            <h2>Billing Contact</h2>
                            <div className = {this.state.nameValid===false? "tooltip" : ''}>
                            <input type="text" placeholder="Full Name" value={this.state.name} required
                                onChange={this.onNameChange} 
                                className={this.state.nameValid===false?'input-invalid':'input-valid'} />
                                <span className={this.state.nameValid===false? "tooltiptext" : 'tooltiptext-hidden'}>Please enter recipient full name</span>
                            </div>
                            <input type="text" placeholder="Email Address" required
                                onChange={this.onEmailChange} 
                                className={this.state.emailValid===false?'input-invalid':'input-valid'} />
                            <h2>Billing Address</h2>
                            <input type="text" placeholder="Street Address" value={this.state.street} required 
                                onChange={this.onStreetChange} 
                                className={this.state.streetValid===false?'input-invalid':'input-valid'}/>
                            <input type="text" placeholder="Apt, Suite, Bldg, Gate Code (optional)" value={this.state.address}
                                onChange={this.onAddressChange} />
                            <div className="input-with-img"> <input type="text" placeholder="City" value={this.state.city} required 
                                onChange={this.onCityChange} 
                                className={this.state.cityValid===false?'input-invalid':'input-valid'}/> 
                                <img src={geoImg} alt='img'></img> 
                            </div>
                            <div className="country">
                                <select required className={selectClassName} value={this.state.country}
                                    onChange={this.handleSelectChange} >
                                    <option className="option-disabled" disabled>Country</option>
                                    {options}
                                </select>
                                <input type="number" placeholder="ZIP" value={this.state.zip} required 
                                    onChange={this.onZipChange} 
                                    className={this.state.zipValid===false?'input-invalid':'input-valid'}/>
                            </div>
                            <input type="submit" onClick={this.handleSubmit} value="Continue" />
                        </form>
                    </div>
                    <div className="card__order-summary">
                        <Summary disabled={false}/>
                    </div>
                </div>
        )
    }
}