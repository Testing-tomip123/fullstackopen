import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ countries, countriesShow }) => {
  if (countriesShow.length === 1) {
    return (
      <div>
        <h1>{countriesShow[0].name}</h1>
        <div>Capital: {countriesShow[0].capital}</div>
        <div>Population: {countriesShow[0].population}</div>
        <div>Area: {countriesShow[0].area} ㎢</div>
        <div>Currency: {countriesShow[0].currencies[0].name}</div>
        <div>Region: {countriesShow[0].region}</div>
        <h2>Languages</h2>
        <ul>
          {countriesShow[0].languages.map(language =>
            <li key={language.name}>{language.name}</li>
          )}
        </ul>
        <img src={countriesShow[0].flag} alt={countriesShow[0].name} height='200' width='200' />
      </div>
    )
  }
  else if (countries === undefined || countriesShow.length <= 10) {
    return (
      <div>
        {countriesShow.map((country) =>
          <div key={country.numericCode}>
            {country.name}
            </div>
        )}
      </div>
    )
  }
  else {
    return (
      <div>Too many matches, specify another filter</div>
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

  const countriesShow = countries.filter(country =>
    country.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
    <div>
      find countries <input value={searchName} onChange={handleSearch} />
    </div>
    <Countries countries={searchName} countriesShow={countriesShow} />
    </div>
  )
}
 





export default App;
