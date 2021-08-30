import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../context/AppContext";
import axios from "axios";
import localforage from "localforage";

import List from "../List/List";
// import "./myPets.css";

export default function MyPets() {
	const [havePets, setHavePets] = useState(false);
	const [petsList, setPetsList] = useState([]);

	const appContext = useContext(AppContext);

	useEffect(async () => {
		const token = await localforage.getItem("token");
		const response = await axios.get(`http://localhost:4000/pets/userPets`, {
			headers: { Authorization: "Bearer " + token }
		});
		const data = response.data;
		if (data) {
			setHavePets(true);
			setPetsList(data);
		}
	}, []);

	return (
		<div className="my-pets-wrapper">
			<h1 className="text-center">My pets </h1>

			<div className="list-wrap">
				{havePets ? (
					petsList.map((pet, i) => {
						return <List pet={pet} idx={i} />;
					})
				) : (
					<p className="text-center">You currently don't own any pets.</p>
				)}
			</div>
		</div>
	);
}
