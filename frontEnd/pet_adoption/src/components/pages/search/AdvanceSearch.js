import React, { useState, useContext, useEffect } from "react";

import { Form, Row, Col, Button } from "react-bootstrap";
import AppContext from "../../../context/AppContext";
import axios from "axios";
import List from "../../List/List";
import localforage from "localforage";

function AdvanceSearch() {
	const [adoptionStatus, setAdoptionStatus] = useState();
	const [weight, setWeight] = useState();
	const [height, setHeight] = useState();
	const [type, setType] = useState();
	const [name, setName] = useState();
	const [advancedSearch, setAdvancedSearch] = useState({});
	const [isAdvanced, setIsAdvanced] = useState(false);

	const appContext = useContext(AppContext);

	const handleAdvancedSearch = () => {
		setAdvancedSearch({
			name: name,
			status: adoptionStatus,
			weight: weight,
			height: height,
			type: type
		});
	
	};

	useEffect(async () => {
		const token = await localforage.getItem("token");
		const response = await axios.get(
			`http://localhost:4000/search/advancedSearch/?type=${type}&name=${name}&height=${height}&status=${adoptionStatus}&weight=${weight}`,
			{ headers: { "Authorization": "Bearer " + token } }
		);
		const advancedData = response.data;
		console.log("advancedData:", advancedData);
		appContext.setAdvancedSearch(advancedData);
		setIsAdvanced(true);
	}, [advancedSearch]);

	return (
		<>
			<div>
				<Form>
					<Row className="align-items-center">
						<input
							type="text"
							onChange={(e) => setName(e.target.value)}
							placeholder="Search by name"
						></input>
						<input
							type="text"
							onChange={(e) => setType(e.target.value)}
							placeholder="Search by type"
						></input>
						<input
							type="text"
							onChange={(e) => setAdoptionStatus(e.target.value)}
							placeholder="Search by status"
						></input>
						<input
							type="text"
							onChange={(e) => setWeight(e.target.value)}
							placeholder="Search by weight"
						></input>
						<input
							type="text"
							onChange={(e) => setHeight(e.target.value)}
							placeholder="Search by height"
						></input>

						<Col xs="auto" className="my-1">
							<Button onClick={handleAdvancedSearch}>Submit</Button>
						</Col>
					</Row>
				</Form>
			</div>
			<div className="list-wrap">
				{isAdvanced &&
					appContext.advancedSearch.map((pet, i) => {
						return <List pet={pet} idx={i} />;
					})}
			</div>
		</>
	);
}

export default AdvanceSearch;
