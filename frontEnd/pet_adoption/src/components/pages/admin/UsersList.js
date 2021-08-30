import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import localforage from "localforage";

export default function UsersList() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		const token = await localforage.getItem('token')
		const response = await axios.get("http://localhost:4000/users", {
			headers: { "Authorization": "Bearer " + token }
		});
		const data = response.data;
		setUsers(data);
	};

	const usersList = users.map((item) => {
		return (
			<tr>
				<td>{ item.user_id }</td>
				<td>{item.first_name}</td>
				<td>{item.last_name}</td>
				<td>{item.phone}</td>
			</tr>
		);
	});

	return (
		<>
			<div className="main" id="section1">
				<h2>Users</h2>
				<Table className="users-list" striped bordered hover size="sm">
					<thead>
						<tr>
							<th>#</th>
							<th>first name</th>
							<th>Last Name</th>
							<th>Phone number</th>
						</tr>
					</thead>
					<tbody>
						{usersList}
					</tbody>
				</Table>
			</div>
		</>
	);
}
