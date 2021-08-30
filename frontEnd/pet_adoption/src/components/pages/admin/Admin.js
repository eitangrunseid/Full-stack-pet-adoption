import React  from "react";
import AddPet from "./AddPet";
import UsersList from "./UsersList";
import PetsList from "./PetsList";
import "./Admin.css";

import 'react-bootstrap'

function Admin() {

	return (
		<div className="admin-wrapper">
			<h1>Hello Admin</h1>
			<div className="main" id="section1">
				<a className="add-pet-link" href="#section2">
					<button className="btn btn-info">want to Add a Pet?</button>
				</a>
				<PetsList />
				<UsersList />
			</div>

			<div className="main" id="section2">
				<AddPet />
				<a href="#section1">
					<button className="btn btn-info">Go Back</button>
				</a>
			</div>
		</div>
	);
}

export default Admin;
