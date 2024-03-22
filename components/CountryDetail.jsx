import React, { useEffect, useState } from "react";
import './countryDetail.css'
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import UseDimensionHook from "./UseDimensionHook";
import { useTheme } from '../hooks/useTheme'
const CountryDetail = () => {

  // const countryName = new URLSearchParams(location.search).get("name");

  const params = useParams()
  const countryName = params.country;
  const { state } = useLocation();
  console.log(state)
  const [isDark] = useTheme()

  const [countryData, setCountryData] = useState(null)

  function updateCountryData(data) {
    setCountryData({
      name: data.name.common,
      nativeName: Object.values(data.name.nativeName)[0].common,
      population: data.population,
      region: data.region,
      subregion: data.subregion,
      capital: data.capital,//array 
      flag: data.flags.svg,
      tld: data.tld,//array
      currencies: Object.values(data.currencies)
        .map((currency) => currency.name)
        .join(', '),
      languages: Object.values(data.languages).join(','),
      borders: []

    })

    if (!data.borders) {
      data.borders = []
    }

    //using promise.all for optimizing  
    Promise.all(data.borders.map((border) => {
      return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res) => res.json())
        .then(([borderCountry]) => {
          return borderCountry.name.common;
          // Assuming borderCountry is an object with the country data
          // Access the desired data from borderCountry and update state accordingly

          // console.log(borderCountry.name.common)
          // setCountryData((prevState)=>({...prevState, borders: [...prevState.borders,borderCountry.name.common]}))
        })
        .catch((error) => {
          console.error('Error fetching border country data:', error);
          // Handle any errors that occur during the fetch request
        });
    })).then((borders) => {
      setTimeout(() => {
        setCountryData((prevState) => ({ ...prevState, borders }))
      });
    })
  }
  // const windowSize = UseDimensionHook();

  useEffect(() => {
    if (state) {
      updateCountryData(state)
      return;
    }
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {

        updateCountryData(data)



      });

  }, [countryName]);

  return countryData === null ? (
    'loading....'
  ) : (
    <main className={`${isDark ? 'dark' : ''}`}>

      {/* {windowSize} */}
      <div className="country-details-container">
        <span className="back-button" onClick={(e) => { history.back() }}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        <div className="country-details">
          <img src={countryData.flag} alt={`${countryData.flag.name} flag`} />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p>
                <b>Native Name: </b>
                <span className="native-name">{countryData.nativeName}</span>
              </p>
              <p>
                <b>Population: {countryData.population.toLocaleString('en-IN')} </b>
                <span className="population"></span>
              </p>
              <p>
                <b>Region: {countryData.region}</b>
                <span className="region"></span>
              </p>
              <p>
                <b>Sub Region: {countryData.subregion} </b>
                <span className="sub-region"></span>
              </p>
              <p>
                <b>Capital:{countryData.capital.join(',')} </b>
                <span className="capital"></span>
              </p>
              <p>
                <b>Top Level Domain:{countryData.tld} </b>
                <span className="top-level-domain"></span>
              </p>
              <p>
                <b>Currencies:{countryData.currencies} </b>
                <span className="currencies">{ }</span>
              </p>
              <p>
                <b>Languages:{countryData.languages} </b>
                <span className="languages">{ }</span>
              </p>
            </div>
            {countryData.borders.length !== 0}&&<div className="border-countries">
              <b>Border Countries:</b>&nbsp;{countryData.borders.map((border) => {
                return <Link key={border} to={`/${border}`}>{border}</Link>;

              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  )



};

export default CountryDetail;


