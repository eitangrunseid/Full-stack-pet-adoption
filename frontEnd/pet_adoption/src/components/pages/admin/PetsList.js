import React, { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import AppContext from "../../../context/AppContext"
import localforage from "localforage";

export default function PetsList() {
	const [pets, setPets] = useState([]);
	const [list, setList] = useState(false);
	const appContext = useContext(AppContext)

	useEffect(async () => {
		const token = await localforage.getItem("token");
		const response = await axios.get("http://localhost:4000/pets/pets", {
			headers:{ "Authorization": "Bearer "+ token}
		});
		const data = response.data;
		setPets(data);
		appContext.setPetList(data);
	}, [list]);

	useEffect(() => {
		setList(true);
	}, []);

	const petsList = pets.map((item) => {
		return (
			<tr>
				<td>{ item.pet_id }</td>
				<td>{item.name}</td>
				<td>{item.type}</td>
				<td>{item.status}</td>
			</tr>
		);
	});

	return (
		<div>

			<Table className="pets" striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>#</th>
						<th>Pet name</th>
						<th>Pet type</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{petsList}
				</tbody>
			</Table>
		</div>
	);
}
