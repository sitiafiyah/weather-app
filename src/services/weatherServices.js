import { DateTime } from "luxon";

// const API_KEY = "895284fb2d2c50a520ea537456963d9c";
const API_KEY = "1de8dcce5543f10e85597382efce15db";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric

const getWeatherData = (infoType, searchParams) => {
	const url = new URL(BASE_URL + "/" + infoType);
	url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

	return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
	const {
		clouds: { all },
		coord: { lat, lon },
		main: { temp, humidity },
		name,
		dt,
		sys: { country },
		weather,
		wind: { speed },
	} = data;

	const { main: details } = weather[0];

	return {
		dt,
		name,
		country,
		details,
		temp,
		lat,
		lon,
		speed,
		all,
		humidity
	};
};

const formatForecastWeather = (data) => {
	let { timezone, daily, hourly } = data;
	// daily = daily.slice(1, 6).map((d) => {
	// 	return {
	// 		time: formatToLocalTime(d.dt, timezone, "ccc"),
	// 		temp: d.temp.day,
	// 		icon: d.weather[0].icon,
	// 	};
	// });

	hourly = hourly.slice(1, 7).map((d) => {
		return {
			time: formatToLocalTime(d.dt, timezone, "hh:mm a"),
			temp: d.temp,
			icon: d.weather[0].icon,
		};
	});

	return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
	const formattedCurrentWeather = await getWeatherData(
		"weather",
		searchParams
	).then(formatCurrentWeather);

	const { lat, lon } = formattedCurrentWeather;

	const formattedForecastWeather = await getWeatherData("onecall", {
		lat,
		lon,
		exclude: "current,minutely,alerts",
		units: searchParams.units,
	}).then(formatForecastWeather);

	return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
	secs,
	zone,
	format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
	`http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
