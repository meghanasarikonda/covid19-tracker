import './App.css';
import {useEffect, useState} from "react";
import { FormControl, Select, MenuItem } from '@material-ui/core';
import InfoCard from './Infocard';
import Map from './Map';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('AF')

  useEffect(() => {
    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        ))
        setCountries(countries);
      })
    }
    getCountriesData()
  }, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode)
  }

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">Wirldwide</MenuItem>
              {
                countries.map(country => 
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                )
              }
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoCard title="Coronavirus Cases" total="2000"/>
          <InfoCard title="Recovered" total="3000"/>
          <InfoCard title="Deaths" total={4000}/>
        </div>
        <Map/>
      </div>
      <div className="app__right">
        {/* Display Table */}
        {/* Display Graph */}
      </div>
    </div>

  );
}

export default App;
