import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Inputs from "./components/Inputs";
import getFormattedWeatherData from "./services/weatherServices";
import Forecast from './components/Forecast';
import 'bootstrap/dist/css/bootstrap.min.css';
import Details from './components/Details';


function App() {
	const [lat, setLat] = useState(null);
	const [lon, setLon] = useState(null);
	const [query, setQuery] = useState();
	const [units, setUnits] = useState("metric");
	const [weather, setWeather] = useState(null);
	
	useEffect(() => {
		if (navigator.geolocation) {
			// toast.info("Fetching users location.");
			navigator.geolocation.getCurrentPosition((position) => {
				// toast.success("Location fetched!");
				setLat(position.coords.latitude);
				setLon(position.coords.longitude);
			});
		}

		console.log(lat, "ini nilai lat")

	}, [lat, lon])

	

	useEffect(() => {
		console.log(lat, "ini nilai lat yang ke 2")

		const fetchWeather = async () => {
			await getFormattedWeatherData({ lat: lat, lon: lon, ...query, units }).then((data) => {
				setWeather(data);
			});
		};

		fetchWeather();

	}, [lat, lon, query, units]);


	return (
		<div className="app">
			<Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

			{weather &&
				<div>
					<Details weather={weather} />
					<Forecast title="Weather Today" items={weather.hourly} />
				</div>
			}

		</div>
	);
}

export default App;
