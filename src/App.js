import React, { Component } from 'react';
import './App.css';
import Titles from "./Components/Titles";
import Forms from "./Components/Forms";
import Weather from "./Components/Weather";

// My unique API KEY defined
const API_KEY = "9feeae090df0fb209f4040cb86ca8638";

class App extends Component {
  // Intialising state to be undefined
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  // Created a function to get value of city and country when the user enters it into the form
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    // Fetching api url from OpenWeather to get the current weather data
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    // Returning the data from url to json format
    const data = await api_call.json();
    // If city and country has been typed into the form from the user, this state with change
    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
      // else if the city and country has not been entered in and the user clicks the Get Weather button an error will be returned
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter city and country to get current weather"
      });
    }
  }
  
  
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Forms getWeather={this.getWeather} />
                  <Weather 
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}




export default App;
