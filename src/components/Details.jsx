import React from "react";
import { BiMap } from "react-icons/bi";
import { formatToLocalTime } from "../services/weatherServices";

function Details({
    weather: {
        dt,
        timezone,
        name,
        details,
        temp,
    },
}) {
    return (
        <div className="details">
            <div className="top">
                <div className="location">
                    <p style={{ fontSize: 30 }}>
                        <BiMap size="25px" /> {name}
                        <p style={{ fontSize: 20 }}>
                            {formatToLocalTime(dt, timezone)}
                        </p>
                    </p>
                </div>
                <div className="temp">
                    {temp ? <p style={{ fontSize: 110 }}> {temp.toFixed()}°C </p> : null}
                </div>
                <div className="description">
                    {details ? <p style={{ fontSize: 40 }}>Its {details}</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Details;