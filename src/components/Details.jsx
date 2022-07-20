import React from "react";

function Details({ 
    weather: {
        name,
        details,
        icson,
        temp,
        temp_min,
        temp_max,
        sunrise,
        sunset,
        speed,
        humidity,
        feels_like,
        timezone,
      },
 }) {
    return (
        <div className="details">
            <div className="top">
                <div className="location">
                    <p>{name}</p>
                </div>
                <div className="temp">
                    {temp ? <h1>{temp.toFixed()}°C</h1> : null}
                </div>
                <div className="description">
                    {details ? <p>Its {details}</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Details;