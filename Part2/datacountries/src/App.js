import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  return (
    <><div>
      <h1>{country[0].name}</h1>
      <div>Capital: {country[0].capital}</div>
      <div>Population: {country[0].population}</div>
      <div>Area: {country[0].area} ㎢</div>
      <div>Currency: {country[0].currencies[0].name}</div>
      <div>Region: {country[0].region}</div>
      <h2>Languages</h2>
      <ul>
        {country[0].languages.map(language => <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={country[0].flag} alt={country[0].name} height='200' width='300' />
    </div><div>
        <Weather city={country[0].capital} />
      </div></>
  )
}

const Weather = ({ city }) => {
  const [theWeather, setWeather] = useState([])
  // api key = 37c865110d45a72b1f18c292be08683f
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [city])

  return (
    <div>
      <h2>Weather in {city}</h2>
      <div>
        <b>Temperature: </b> {theWeather?.main?.temp} Celsius
      </div>
      <div>
        <b>Cloudiness: </b> {theWeather?.clouds?.all} %
      </div>
      <div>
        <b>Temperature min: </b> {theWeather?.main?.temp_min} Celsius
      </div>
      <div>
        <b>Temperature max: </b> {theWeather?.main?.temp_max} Celsius
      </div>
      <div>
        <b>Wind: </b> {theWeather?.wind?.speed} m/s
      </div>
      <div>
        <b>Wind direction: </b> {theWeather?.wind?.deg} degrees
      </div>
      <div>
        <b>Pressure: </b> {theWeather?.main?.pressure} hPa
      </div>
      <div> 
        <b>Description: </b> {theWeather?.weather?.[0]?.description}
      </div>
      <div>
        <img src={`http://openweathermap.org/img/wn/${theWeather?.weather?.[0].icon}.png`} alt={theWeather?.weather?.[0].description} height='100' width='100'/>
      </div>
    </div>
  )
}


const Countries = ({ searchName, countriesShow, ShowCountry }) => {
  if (countriesShow.length === 1) {
    return <Country country={countriesShow} />
  } 
  else if (countriesShow.length <= 10) {
    return (
      <div>
        {countriesShow.map(country =>
          <div key={country.numericCode}>
            {country.name}
            <button type='button' value={country.name} onClick={ShowCountry}>Show</button>
          </div>
        )}
      </div>
    )
  }
  else if (searchName === '') {
    return (
      <div>
        {countriesShow.map(country =>
          <div key={country.numericCode}>
            {country.name}
          </div>
        )}
      </div>
    )
  }
  else {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchName, setSearchName] = useState('')


  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setSearchName(event.target.value)
  }

  const ShowCountry = (event) => {
    event.preventDefault()
    setSearchName(event.target.value)
  }

  const countriesShow = countries.filter(country =>
    country.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
    <div>
      find countries <input value={searchName} onChange={handleSearch} />
    </div>
    <Countries countries={searchName} countriesShow={countriesShow} ShowCountry={ShowCountry} />
    </div>
  )
}
 

export default App;
