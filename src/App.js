// DOM - Document Object Model

import { useState } from "react";

// useEffect hooks tells our component to do something after rendeirng
import { useEffect } from 'react';

// axios modules to HTTP API calls
import axios from 'axios';

// we are writing Java Script here.
function App(){
  // we don't create an object inside setState, since we just have one value here
  const [search, setSearch] = useState('');

  // instantiate hooks here, dynamic data arry for 
  const [allData, setAllData] = useState({
    city: '',
    country: '',
    temperature: '',
    humidity: '',
    min_temperature: '',
    weatherIcons: ''
  });

  useEffect(() => {
    // we will add what we want to happen after rendering
    // we need to fetch the database information of weather, from API which will have data in JSON format
    // [] as an additional parama to useEffect prevents us from calling fetchData() more number of times everywhere
    fetchData();
  }, []);

  // create a function to fetch data from open weather apis
  // we will using city for search functionality
  const fetchData = async(city) => {

    // This key is from OpenWeatherMap account and its free.
    const apikey = "5a990c9b6beb85f28d2fa01e79f95c93";

    try{
        // we will use axios npm modules to make HTTP API calls.
        // metric units = celcious
        // imperial units = Farenheit
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=imperial`, {
          headers: {
              'Content-Type': 'application/json'
          }
        });

        await setAllData({
          city: result.data.name,
          country: result.data.sys.country,
          temperature: result.data.main.temp,
          humidity: result.data.main.humidity,
          min_temperature: result.data.main.temp_min,
          weatherIcons: result.data.weather[0].icon
        });
    }catch(error){
      console.log(error);
    } 
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(search);
  }

  const handleChange = (event) => {
    setSearch(event.target.value);
  }



  return(
    // JSX allows us to write HTML in Java Script
    // forms will contain their own state, and they are not like containers
    // sections tag for sections and main tag is for complete container
    // so under main tag, we will have all sections
    <main>
      <div className="form">

        <form onSubmit={handleSubmit} >
          <input
            value={search}
            type = 'text'
            name='city'
            placeholder='City Name'
            onChange={handleChange}
          />
          <button for='city'>Search</button>
        </form>

        <section>
          <div className="weather-div">
            <img  src= { 'http://openweathermap.org/img/w/'+allData.weatherIcons+'.png' } />
            <h3 className="title" >{allData.city}</h3>
            <h4 className="location">{allData.country}</h4>

            <div className="weather-description">
              <div>
                <p>Temperature: {allData.temperature}°F </p>
                <p>Min Temperature: {allData.min_temperature}</p>
              </div>
              
              <div>
                <p>Humidity:{allData.humidity}%</p>
                {/* <p>Weather Icon: {allData.weatherIcons}</p> */}
              </div>
            </div>
          </div>        
        </section>

      </div>
    </main>
  );
}

export default App; 