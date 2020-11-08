import './App.css';
import {useEffect, useState} from "react";
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import InfoCard from './Infocard';
import Map from './Map';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState('')

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
      });
  }, [])

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
    setCountry(countryCode);

    const url = 
      countryCode ===  "worldwide"
        ? "https://disease.sh/v3/covid-19/all" 
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
      })

    // /v3/covid-19/countries/{country} for individual country
    // /v3/covid-19/countries for worldwide
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
          <InfoCard title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoCard title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoCard title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        <Map/>
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <h3>Live cases</h3>
            <h3>worldwide new cases</h3>
          </CardContent>
        </Card>
      </div>
    </div>

  );
}

export default App;
