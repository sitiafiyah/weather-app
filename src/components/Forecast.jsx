import React from "react";
// import { iconUrlFromCode } from "./services/weatherService";

function Forecast({ title, items }) {
    // console.log(items, "items")
    return (
        <div className="details">
            <h1>{title}</h1>
            <div className="d-flex">
                {items.map((item, index) => (
                    <div className="detail row" key={index}>
                        <p> {item.title} </p>
                        <p> {`${item.temp.toFixed()}°`} </p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Forecast;