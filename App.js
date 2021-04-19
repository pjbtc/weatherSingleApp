import React,{useEffect, useState} from 'react';
import countries from 'i18n-iso-countries';
import './App.css';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));


export default function App() {

    // State
const [apiData, setApiData] = useState({}); //apiData state is used to store the response
const [getState, setGetState] = useState('pokhara'); //getState is used to store the location name from input field
const [state, setState] = useState('pokhara'); //state is used to store a copy of the getState this will be helpful in updating state on button click. You can ignore this state and directly pass getState on the URL as well

// API KEY AND URL
const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

useEffect(() => { //The useEffect hook is used to perform side effects on your app, this is an alternative to componentDidMount, unmount, etc.. lifecycle hook from react class components.
    fetch(apiUrl) // it fetches the data from the given api url and stores in apiData state. This happens only when apiUrl changes thus it will prevent unwanted re-render.
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]); //[] this is the dependency array this determines when to re-render a componenet, 
  //when it is left empty it'll render only once. When we specify a dependency it will render only when it is updated.


  const inputHandler = (event) => { //inputHandler function is used to handle the input field, to get the data and store in getState
    setGetState(event.target.value);
  };
  
  const submitHandler = () => { //submitHandler function is used to copy the state from getState to state
    setState(getState);
  };
  
  const kelvinToFarenheit = (k) => { //kelvinToFarenheit function is used to convert kelvin to farenheit, since we get the data from api as kelvin we're using this function.
    return (k - 273.15).toFixed(2);
  };

return (
           <div className="App">
    <header className="d-flex justify-content-center align-items-center">
      <h2>React Weather App</h2>
    </header>
    <div className="container">
      <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
        <div class="col-auto">
          <label for="location-name" class="col-form-label">
            Enter Location :
          </label>
        </div>
        <div class="col-auto">
          <input
            type="text"
            id="location-name"
            class="form-control"
            onChange={inputHandler}
            value={getState}
          />
        </div>
        <button className="btn btn-primary mt-2" onClick={submitHandler}>
          Search
        </button>
      </div>

      <div className="card mt-3 mx-auto" style={{ width: '60vw' }}>
        {apiData.main ? (
          <div class="card-body text-center">
            <img
              src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
              alt="weather status icon"
              className="weather-icon"
            />

            <p className="h2">
              {kelvinToFarenheit(apiData.main.temp)}&deg; C
            </p>

            <p className="h5">
              <i className="fas fa-map-marker-alt"></i>{' '}
              <strong>{apiData.name}</strong>
            </p>

            <div className="row mt-4">
              <div className="col-md-6">
                <p>
                  <i class="fas fa-temperature-low "></i>{' '}
                  <strong>
                    {kelvinToFarenheit(apiData.main.temp_min)}&deg; C
                  </strong>
                </p>
                <p>
                  <i className="fas fa-temperature-high"></i>{' '}
                  <strong>
                    {kelvinToFarenheit(apiData.main.temp_max)}&deg; C
                  </strong>
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  {' '}
                  <strong>{apiData.weather[0].main}</strong>
                </p>
                <p>
                 <strong>
                    {' '}
                    {countries.getName(apiData.sys.country, 'en', {
                      select: 'official',
                    })}
                </strong> 
                </p>
              </div>
            </div>
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
    <footer className="footer">
      <code>
        Created by{' '}
        <a href="https://github.com/pjbtc" target="none">
          pjbtc.com
        </a>{' '}
        using React
      </code>
    </footer>
  </div>
        )
    }

