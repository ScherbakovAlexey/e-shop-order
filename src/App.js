import React, {Component} from 'react';
import './App.scss';
import Card from './Card/Card';
import Header from './Header/Header';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      country: 'Russia',
      city: 'Kazan',
      postal_code: '420000',
      street: 'Pushkina',
      house: '46',
      flat: '401',
      name: 'Jonathan Smith',
      email: 'j.smith@gmail.com',
      phone: '+7(987)123-77-88',
      cardNum: '4012 8888 8888 1881',
      geolocationEnabled: false,
      basketEmpty: false,
      countries: []
    }
    this.handleBasket = this.handleBasket.bind(this);
  }

  componentWillMount(){

    if (navigator.geolocation) navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos);
      var lat = pos.coords.latitude;
      var lng = pos.coords.longitude;
      codeLatLng(lat, lng);
      this.setState({
        geolocationEnabled: true
      });
    });
  
    const codeLatLng = (lat, lng) => {
      fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address/', {
        method: 'POST',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token 9dfd43c7f10c01766b6fcd7a877df7da110915f4'
        },
        body: JSON.stringify({
          "lat": lat,
          "lon": lng
        })
      })
      .then((res) => {
        res.json()
        .then(response => {
          const city = response.suggestions[0].data.city,
          postal_code = response.suggestions[0].data.postal_code,
          country = response.suggestions[0].data.country,
          street = response.suggestions[0].data.street,
          house = response.suggestions[0].data.house;
          //let city = address.slice(address.search(/г\s/)+2,address.search(/,\s/));
          console.log(city);
          console.log(postal_code);
          this.setState({
            country: country,
            city: city,
            postal_code: postal_code,
            street: street,
            house: house
          });
        })
      })
      .catch((err) => console.error(err));
    }


    /// get countries
    
    fetch('https://htmlweb.ru/geo/api.php?location&json&short&api_key=1a019db68f398a4a30afcb58842c4403')
    .then((res)=>{
      res.json()
        .then(response => {
          console.log(response);
          let countries = [];
          for (let key in response){countries.push(response[key])}
          this.setState({
            countries: countries
          });
        })
    })

  }

  handleBasket(){
    this.setState({
      basketEmpty: true
    });
  }

  render(){
    return (
      <div className="App">
       {/*{this.state.city} {this.state.postal_code}*/}
       <Header basketEmpty={this.state.basketEmpty}/>
       <Card info={this.state} onSuccess={this.handleBasket}/>
      </div>
    );
  }
}

export default App;
