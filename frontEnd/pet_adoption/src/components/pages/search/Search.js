import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

import "../../../App.css";
import "../../../components/List/List.css";
import "./search.css";
import AdvanceSearch from "./AdvanceSearch";
import List from "../../List/List";
import axios from "axios";
import localforage from "localforage";

function Search() {
	const [advanced, setAdvanced] = useState(false);
	const [nameSearch, setNameSearch] = useState('');
	const [pets, setPets] = useState();

	const handleNameSearch = async () => {
		const token = await localforage.getItem('token')
		const response = await axios.post(
			`http://localhost:4000/search/search`,
			{ search: nameSearch },
			{ headers: { Authorization: "Bearer " + token } }
		);
		const data = response.data;
		setPets(data);
	};

	const handleAdvanced = () => {
		setAdvanced(!advanced);
	};

	return (
		<div className="search-wrapper">
			<div>
				<InputGroup
					onChange={(e) => {
						setNameSearch(e.target.value);
					}}
				>
					<FormControl placeholder="Search for a friend" />
					<Button className="search"onClick={handleNameSearch} variant="outline-secondary">
						Search
					</Button>
					<Button variant="outline-secondary" onClick={handleAdvanced}>
						{advanced ? "Close Advanced search" : "Advanced search"}
					</Button>
				</InputGroup>
			</div>
			<div>{advanced && <AdvanceSearch />}</div>
			<div className="list-wrap">
				{pets && pets.map((pet, i) => {
					return <List pet={pet} idx={i}  />
				})}
			</div>
		</div>
	);
}

export default Search;
