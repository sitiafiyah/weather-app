import React, { useState } from "react";
import { BiMap, BiWind, BiCloud, BiDroplet, BiPencil } from "react-icons/bi";
import { formatToLocalTime } from "../services/weatherServices";
import SuggestEdit from "./SuggestEditForm";

export default function Details({
    weather: {
        dt,
        timezone,
        name,
        details,
        temp,
        speed,
        all,
        humidity
    },
}) {

    const [showModal, setShowModal] = useState(false);

    return (
        <div className="details">
            <div className="top">
                <div className="location">
                    <div>
                        <p style={{ fontSize: 30 }}>
                            <BiMap size="25px" /> {name} <br />
                            <span style={{ fontSize: 20 }}>
                                {formatToLocalTime(dt, timezone)}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="temp">
                    {temp ? <p style={{ fontSize: 110 }}> {`${temp.toFixed()}°C`} </p> : null}
                </div>
                
                <div className="description">
                    {details ? <p style={{ fontSize: 40 }}> {`Its ${details}`}</p> : null}
                </div>

                <div className="justify-content-md-center text-center">
                    <div className="col col-lg-12">
                        <BiWind /> {`Wind : ${speed.toFixed()} km/h `}
                        <span style={{ margin: "10px" }}> | </span>
                        <BiDroplet /> {` Humidity : ${humidity}% `}
                        <span style={{ margin: "10px" }}> | </span>
                        <BiCloud /> {` Clouds: ${all}% `}
                    </div>
                </div>
                
                <div className="container text-center mt-4">
                    <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)} > <BiPencil /> Suggest Edit </button>
                    {showModal && <SuggestEdit showModal={showModal} onHide={() => setShowModal(false)} />}
                </div>

            </div>
        </div>
    )
}
