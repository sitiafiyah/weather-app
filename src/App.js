import React, { useState, useEffect } from 'react'
import getFormattedWeatherData from "./services/weatherServices";
import Forecast from './components/Forecast';
import Details from './components/Details';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
	const [lat, setLat] = useState(null);
	const [lon, setLon] = useState(null);
	const [query, setQuery] = useState();
	const [units, setUnits] = useState("metric");
	const [weather, setWeather] = useState(null);
	
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				setLat(position.coords.latitude);
				setLon(position.coords.longitude);
			});
		}
	}, [lat, lon])

	useEffect(() => {
		const fetchWeather = async () => {
			await getFormattedWeatherData({ lat: lat, lon: lon, ...query, units }).then((data) => {
				setWeather(data);
			});
		};

		fetchWeather();

	}, [lat, lon, query, units]);

	return (
		<div className="app">
			{/* <Inputs setQuery={setQuery} units={units} setUnits={setUnits} /> */}
			{weather &&
				<div>
					<Details weather={weather} />
					<Forecast title="Today's Weather" items={weather.hourly} />
				</div>
			}
			<ToastContainer autoClose={3000} theme="colored" newestOnTop={true} />
		</div>
	);
}

export default App;
