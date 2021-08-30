import React, { useState, useEffect, useContext } from "react";
import LikedPetsList from "../List/LikedPetsList";
import axios from "axios";
import localforage from "localforage";
import AppContext from "../../context/AppContext";

export default function MyLikedPets() {
	const [likedPets, setLikedPets] = useState();
	const [isLiked, setIsLiked] = useState(false);

	useEffect(async () => {
		const token = await localforage.getItem("token");
		const response = await axios.get(`http://localhost:4000/pets/savedPets`, {
			headers: { Authorization: "Bearer " + token }
		});
		const data = response.data;
		if (data.length) {
			setLikedPets(data);
			setIsLiked(true);
		}
	}, []);

	return (
		<>
			<h1>Pets you liked</h1>
			{console.log(likedPets)}
			<div className="list-wrap">
				{isLiked ? (
					likedPets.map((pet, i) => {
						return <LikedPetsList pet={pet} idx={i} />;
					})
				) : (
					<p className="text-center">You currently don't Like any pets.</p>
				)}
			</div>
		</>
	);
}
