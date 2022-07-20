import React, { useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { Container, Row, Col } from "react-bootstrap";

function Inputs({ setQuery, units, setUnits }) {
	const [location, setLocation] = useState("")

	const searchLocation = (event) => {
		console.log("searchLocation")
		if (event.key === "Enter") {
			setQuery({ q: location })
			setLocation("")
		}
	}

	const handleLocationClick = () => {
		if (navigator.geolocation) {
			// toast.info("Fetching users location.");
			navigator.geolocation.getCurrentPosition((position) => {
				// toast.success("Location fetched!");
				let lat = position.coords.latitude;
				let lon = position.coords.longitude;

				setQuery({
					lat,
					lon,
				});
			});
		}
	};

	return (
		<>
			<Container>
				<Row className="search justify-content-md-center">
					<Col md="auto">
						<input
							value={location}
							onChange={event => setLocation(event.target.value)}
							placeholder="Search for city.."
							onKeyPress={searchLocation}
							type="text" />
					</Col>
					<Col md="auto" className="justify-content-md-center" >
						<BiCurrentLocation
							size="46px"
							onClick={handleLocationClick}
						/>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Inputs;
