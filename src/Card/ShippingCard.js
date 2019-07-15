import React, {Component} from 'react'
import './card.scss'
import Status from './Status'
import geoEn from './geo-en.png'
import geoDis from './geo-dis.png'

export default class ShippingCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            countrySelectActive: false,
            name: '',
            nameValid: '',
            phone: '',
            phoneValid: '',
            street: '',
            streetValid: '',
            address: '',
            addressValid: true,
            city: '',
            cityValid: '',
            country: '',
            countryValid: '',
            zip: '',
            zipValid: '',
            formValid: ''
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.onStreetChange = this.onStreetChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.onZipChange = this.onZipChange.bind(this);
    }

    handleSelectChange(){
        this.setState({
            countrySelectActive: true
        });
        this.setState({countryValid: true});
    }

    handleSubmit(e){
        e.preventDefault();
        if (this.state.nameValid && this.state.phoneValid && this.state.streetValid &&
            this.state.addressValid && this.state.cityValid && this.state.zipValid){
                this.props.onStatusChange('billing');
            } else {
                this.setState({
                    nameValid: !this.state.nameValid ? false : true,
                    phoneValid: !this.state.phoneValid ? false : true,
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
            this.setState({nameValid: true});
        } else {
            this.setState({nameValid: false});
        }
    }
    onPhoneChange(e){
        const phone =  /^((\+7|7|8)+([0-9]){10})$/;
        if (e.target.value.match(phone)){
            this.setState({phoneValid: true});
        } else {
            this.setState({phoneValid: false});
        }
    }
    onStreetChange(e){
        if (e.target.value.length > 2){
            this.setState({streetValid: true});
        } else {
            this.setState({streetValid: false});
        }
    }
    onAddressChange(e){
        this.setState({addressValid: true});
    }
    onCityChange(e){
        if (e.target.value.length > 2){
            this.setState({cityValid: true});
        } else {
            this.setState({cityValid: false});
        }
    }
    onZipChange(e){
        const zip = /^[0-9]{6}(?:-[0-9]{4})?$/;
        if (e.target.value.match(zip)){
            this.setState({zipValid: true});
        } else {
            this.setState({zipValid: false});
        }
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
                        <Status activeItem={1}/>
                        <form>
                            <h1>Shipping Info</h1>
                            <h2>Recipient</h2>
                            <input type="text" placeholder="Full Name" required onChange={this.onNameChange} className={this.state.nameValid===false?'input-invalid':'input-valid'}/>
                            <div className="daytime-phone"> <input type="tel" placeholder="Daytime Phone" required onChange={this.onPhoneChange} className={this.state.phoneValid===false?'input-invalid':'input-valid'}/> <p> For delivery questions only </p> </div>
                            <h2>Address</h2>
                            <input type="text" placeholder="Street Address" required onChange={this.onStreetChange} className={this.state.streetValid===false?'input-invalid':'input-valid'}/>
                            <input type="text" placeholder="Apt, Suite, Bldg, Gate Code (optional)" onChange={this.onAddressChange}/>
                            <div className="city"> <input type="text" placeholder="City" required onChange={this.onCityChange} className={this.state.cityValid===false?'input-invalid':'input-valid'}/> <img src={geoImg}></img> </div>
                            <div className="country"><select className={selectClassName} onChange={this.handleSelectChange} required className={this.state.countryValid===false?'input-invalid':'input-valid'}>
                                <option className="option-disabled" selected="selected" disabled>Country</option>
                                {options}
                                </select>
                                <input type="number" placeholder="ZIP" required onChange={this.onZipChange} className={this.state.zipValid===false?'input-invalid':'input-valid'}/></div>
                            <input type="submit" onClick={this.handleSubmit} value="Continue" />
                        </form>
                    </div>
                    <div className="card__order-summary">Summary</div>
                </div>
        )
    }
}