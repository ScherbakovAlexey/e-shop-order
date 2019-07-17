import React, {Component} from 'react'
import './styles/card.scss'
import Status from './Status'
import Summary from './Summary'
import geoEn from './img/geo-en.png'
import geoDis from './img/geo-dis.png'

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
            streetValid: '' ,
            address: '',
            addressValid: true,
            city: '',
            cityValid: '',
            country: 'Country',
            countryValid: '',
            zip: '',
            zipValid: '',
            formValid: '',
            tooltip: ''
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.onStreetChange = this.onStreetChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.onZipChange = this.onZipChange.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validatePhone = this.validatePhone.bind(this);
        this.validateStreet = this.validateStreet.bind(this);
        this.validateCity = this.validateCity.bind(this);
        this.validateZip = this.validateZip.bind(this);
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
        if (this.state.nameValid && this.state.phoneValid && this.state.streetValid &&
            this.state.addressValid && this.state.cityValid && this.state.countryValid && this.state.zipValid){
                this.props.onStatusChange('billing',this.state);
            } else {
                this.setState({
                    nameValid: !this.state.nameValid ? false : true,
                    phoneValid: !this.state.phoneValid ? false : true,
                    streetValid: !this.state.streetValid ? false : true,
                    addressValid: !this.state.addressValid ? false : true,
                    cityValid: !this.state.cityValid ? false : true,
                    countryValid: !this.state.countryValid ? false : true,
                    zipValid: !this.state.zipValid ? false : true,
                    formValid: false
                });
            }
    }

    onNameChange(e){
        if (this.validateName(e.target.value)) {
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
    validateName(value){
        if (value.length > 2){
            return true
        } else return false
    }
    onPhoneChange(e){
        if (this.validatePhone(e.target.value)){
            this.setState({
                phone: e.target.value,
                phoneValid: true
            });
        } else {
            this.setState({
                phone: e.target.value,
                phoneValid: false
            });
        }
    }
    validatePhone(value){
        const phone =  /^((\+7|7|8)+([0-9]){10})$/;
        if (value.match(phone)){
            return true
        } else return false
    }
    onStreetChange(e){
        if (this.validateStreet(e.target.value)){
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
    validateStreet(value){
        if (value.length > 2){
           return true
        } else return false
    }
    onAddressChange(e){
        this.setState({
            address: e.target.value,
            addressValid: true
        });
    }
    onCityChange(e){
        if (this.validateCity(e.target.value)){
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
    validateCity(value){
        if (value.length > 2){
            return true
        } else return false
    }
    onZipChange(e){
        if (this.validateZip(e.target.value)){
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
    validateZip(value){
        const zip = /^[0-9]{6}(?:-[0-9]{4})?$/;
        if (value.match(zip)){
            return true
        } else return false
    }
    componentDidUpdate(oldProps) {
        if (document.getElementsByClassName('tooltiptext').length){
            document.getElementsByClassName('tooltiptext')[0].classList.add("tooltiptext-hidden");
            document.getElementsByClassName('tooltiptext')[0].classList.remove("tooltiptext");
            this.setState({
                formValid: ''
            });
        }
     
        if (this.state.formValid===false && document.getElementsByClassName('input-invalid').length){
            document.getElementsByClassName('input-invalid')[0].nextSibling.classList.add("tooltiptext");
            document.getElementsByClassName('input-invalid')[0].nextSibling.classList.remove("tooltiptext-hidden");
        }
        
        if (oldProps.info.street !== this.props.info.street) {
            const street = this.props.info.street ? this.props.info.street : '';
            const streetValid = this.validateStreet(street) ? true : '';
            this.setState({
                street: street,
                streetValid: streetValid
            });
        }
        if (oldProps.info.house !== this.props.info.house) {
            const address = this.props.info.house ? this.props.info.house : '';
            this.setState({
                address: address
            });
        }
        if (oldProps.info.city !== this.props.info.city) {
            const city = this.props.info.city ? this.props.info.city : '';
            const cityValid = this.validateCity(city) ? true : '';
            this.setState({
                city: city,
                cityValid: cityValid
            });
        }
        if (oldProps.info.country !== this.props.info.country) {
            const country = this.props.info.country ? this.props.info.country : '';
            const countryValid = true;
            this.setState({
                country: country,
                countryValid: countryValid,
                countrySelectActive: true
            });
        }
        if (oldProps.info.postal_code !== this.props.info.postal_code) {
            const zip = this.props.info.postal_code ? this.props.info.postal_code : '';
            const zipValid = this.validateZip(zip) ? true : '';
            this.setState({
                zip: zip,
                zipValid: zipValid
            });
        }
    }
    render(){
        const geoImg = this.props.info.geolocationEnabled ? geoEn : geoDis;
        const options = [];
        if (this.props.info.countries) this.props.info.countries.forEach((item,index)=>{
            if (typeof item == 'string')
            options.push(<option className="option-enabled" key={index}>{item}</option>);
        });
        const selectClassName = (this.state.countrySelectActive ? 'select-en' : 'select-dis') + ' ' +
                                (this.state.countryValid===false?'input-invalid':'input-valid');
        return(
                <div className="card">
                    <div className="card__info">
                        <Status activeItem={1}/>
                        <form>
                            <h1>Shipping Info</h1>
                            <h2>Recipient</h2>

                            <div className = "tooltip">
                            <input type="text" placeholder="Full Name" required 
                                onChange={this.onNameChange} 
                                className={this.state.nameValid===false?'input-invalid':'input-valid'}/>
                                <span className={"tooltiptext-hidden"}>Please enter recipient full name</span>
                            </div>

                            <div className="daytime-phone"> 
                                <div className = "tooltip">
                                    <input type="tel" placeholder="Daytime Phone" required 
                                    onChange={this.onPhoneChange} 
                                    className={this.state.phoneValid===false?'input-invalid':'input-valid'}/> 
                                    <span className={"tooltiptext-hidden"}>Please enter recipient phone</span>
                                </div>
                                <p> For delivery questions only </p>
                            </div>
                            <h2>Address</h2>

                            <div className = "tooltip">
                            <input type="text" placeholder="Street Address" required 
                                value = {this.state.street}
                                onChange={this.onStreetChange} 
                                className={this.state.streetValid===false?'input-invalid':'input-valid'}/>
                                 <span className={"tooltiptext-hidden"}>Please enter recipient srteet</span>
                            </div>

                            <input type="text" placeholder="Apt, Suite, Bldg, Gate Code (optional)" 
                                value = {this.state.address}
                                onChange={this.onAddressChange}/>

                            <div className="input-with-img">
                            <div className = "tooltip">
                            <input type="text" placeholder="City" required 
                                value = {this.state.city}
                                onChange={this.onCityChange} 
                                className={this.state.cityValid===false?'input-invalid':'input-valid'}/>
                                <span className={"tooltiptext-hidden"}>Please enter city</span>
                                <img src={geoImg} alt='img'></img> 
                            </div>
                            </div>

                            <div className="country">
                            <div className = "tooltip tooltip__country">
                                <select required className={selectClassName} 
                                    value = {this.state.country}
                                    onChange={this.handleSelectChange} >
                                    <option className="option-disabled" disabled>Country</option>
                                    {options}
                                </select>
                                <span className={"tooltiptext-hidden"}>Please enter country</span>
                                </div>

                             <div className = "tooltip tooltip__zip">
                                <input type="number" placeholder="ZIP" required 
                                    value = {this.state.zip}
                                    onChange={this.onZipChange} 
                                    className={this.state.zipValid===false?'input-invalid':'input-valid'}/>
                                    <span className={"tooltiptext-hidden"}>Please enter zip</span>
                              </div>
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