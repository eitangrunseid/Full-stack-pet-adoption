import React from "react";
import "./LikedPetsList.css";
import "../PetInfo/PetInfo.css";
import { BsHeart } from "react-icons/bs";
import { Button } from "react-bootstrap";
import localforage from "localforage";
import axios from "axios";

export default function LikedPetsList({ pet, idx }) {
	const unSave = async () => {
		const token = await localforage.getItem("token");
		const response = await axios.get("http://localhost:4000/users/user", {
			headers: { Authorization: token }
		});
		const user = response.data;
		const userPet = {
			petId: pet.pet_id,
			userId: user.user_id
		};
		const remove = await axios.post(
			"http://localhost:4000/pets/removeSavedPet",
			userPet,
			{ headers: { Authorization: "Bearer " + token } }
		);
		const removedLike = remove.data;
	};

	return (
		<>
			<div className="container1" key={idx}>
				<img src={pet.pet_pic} alt="pet image" />
				<h1>
					<span className="card-info">{pet.name}</span>
				</h1>
				<div style={{ textAlign: "left", padding: "16px" }}>
					<h4>
						type: <span className="card-info">{pet.type}</span>
					</h4>
					<h4>
						status:<span className="card-info">{pet.status}</span>
					</h4>
					<Button onClick={unSave} className="btn btn-info icon">
						UnLIke<BsHeart size="40px" />
					</Button>
				</div>
			</div>
		</>
	);
}
