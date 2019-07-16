import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ countries, filter, handleClick, weather }) => {
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  if (filteredCountries.length === 1) {
    return (
      <div>
        <h3>{filteredCountries[0].name}</h3>
        <p>capital: {filteredCountries[0].capital}</p>
        <p>population: {filteredCountries[0].population}</p>
        <ul>
          languages: {filteredCountries[0]
            .languages
            .map(language =>
              <li key={language.name}>{language.name}</li>
              )}
        </ul>
        <img src={filteredCountries[0].flag} width={300} height={200} alt="flag here" />

        {weather.current && (
          <div>
            <h4>Weather in {filteredCountries[0].capital}</h4>
            <p>temperature:{weather.current.temp_c} Celcius</p>
            <img src={weather.current.condition.icon} alt="weather icon here"/>
            <p>wind: {weather.current.wind_kph} KPH direction {weather.current.wind_dir}</p>
          </div>
        )}

      </div>
    )

  } else if (filteredCountries.length < 10) {
    return (
      <div>
        {filteredCountries.map(country =>
          <p key={country.name}>
            {country.name}
            <button onClick={() => handleClick(country.name)}>
              show
            </button>
          </p>
        )}
      </div>
    )
  } else {
    return (
      <div>
        <p>Too many matches, please be more specific</p>
      </div>
    )
  }

}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState({})

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    if (filteredCountries.length === 1) {
      axios
        .get(`https://api.apixu.com/v1/current.json?key=${`apixu api key here`}&q=${filteredCountries[0].capital}`)
        .then(res => {
          setWeather(res.data)
        })
    }
  }

  const handleClick = (name) => {
    setFilter(name)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  return (
    <div>
      <h1>Country search</h1>
      find countries:<input value={filter}
        onChange={handleFilterChange}
      />
      <Countries countries={countries} filter={filter} handleClick={handleClick} weather={weather} />
    </div>
  )
}

export default App
