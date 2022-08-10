import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const weatherConditions = [{
    clearSky: "Clear Sky",
    fewClouds: "Few Clouds",
    scatteredClouds: "Scattered Clouds",
    brokenClouds: "Broken Clouds",
    showerRain: "Shower Rain",
    rain: "Rain",
    thunderstorm: "Thunderstorm",
    snow: "Snow",
    mist: "Mist"
}]

const weatherConditionList = [{
    value: "clearSky",
    display: "Clear Sky"
}, {
    value: "fewClouds",
    display: "Few Clouds"
}]

function SuggestEdit({ showModal, onHide }) {
    const [temperature, setTemperature] = useState();
    const [description, setDescription] = useState();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!temperature) {
            toast.error("Temperature is required")
        } else if (!description){
            toast.error("Description is required")
        } else {
            setLoading(true)
            setTimeout(() => {
                setLoading(false);
                onHide();
                toast.success("Success");
            }, 4000);
        }
    }

    return (
        <Modal
            size="md"
            show={showModal}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Suggest Edit
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <label htmlFor="temperature" className="form-label">Temperature</label>
                    <input type="text" className="form-control" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onHide}>Close</button>
                <button className="btn btn-primary" onClick={handleSubmit}> {loading ? <>Loading...</> : <>Save</>}</button>
            </Modal.Footer>
        </Modal>
    )
}

export default SuggestEdit;