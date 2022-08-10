import React from "react";
import { iconUrlFromCode } from "../services/weatherServices";

function Forecast({ title, items }) {
    return (
        <div className="details-forecast container" style={{ maxWidth: 800 }}>
            <div className="row text-center" style={{ height: 70 }}>
                <h3 style={{padding: "20px", color: "white"}}> {title} </h3>
            </div>

            <div className="justify-content-md-center d-flex">
                {items.map((item, index) => (
                    <div className="detail row text-center" key={index}>
                        <div className="text-center">
                            <img
                                src={iconUrlFromCode(item.icon)}
                                className="img-fluid"
                                alt=""
                                style={{ height: "70px", width: "auto" }}
                            />
                        </div>
                        <p className="fs-6"> {item.time} </p>
                        <p className="fs-3"> {`${item.temp.toFixed()}°`} </p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Forecast;