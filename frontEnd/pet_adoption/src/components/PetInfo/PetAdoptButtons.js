import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import AppContext from "../../context/AppContext";
import localforage from "localforage";
import axios from "axios";
import { BsHeartFill } from "react-icons/bs";

export default function PetAdoptButtons({ petId, pet }) {
	const [owner, setOwner] = useState(false);
	const [status, setStatus] = useState();
	const appContext = useContext(AppContext);

	const changedStatus = async (status) => {
		const token = await localforage.getItem("token");
		const response = await axios.get("http://localhost:4000/users/user", {
			headers: { Authorization: "Bearer " + token }
		});
		const user = response.data;
		const userPet = {
			petStatus: status,
			petId: petId,
			userId: user.user_id
		};
		const changedPet = await axios.post(
			"http://localhost:4000/pets/status",
			userPet,
			{ headers: { Authorization: "Bearer " + token } }
		);
		const changedStatus = changedPet.data;
	};

	const saveForLater = async () => {
		const token = await localforage.getItem("token");
		const response = await axios.get("http://localhost:4000/users/user", {
			headers: { Authorization: "Bearer " + token }
		});
		const user = response.data;
		const userPet = {
			petId: petId,
			userId: user.user_id
		};
		const changedPet = await axios.post(
			"http://localhost:4000/pets/savedPet",
			userPet,
			{ headers: { Authorization: "Bearer " + token } }
		);
		const changedSave = changedPet.data;
		console.log("changedSave:", changedSave);
	};
	
	const returnPet = async () => {
		const token = await localforage.getItem("token");
		const response = await axios.get("http://localhost:4000/users/user", {
			headers: { Authorization: "Bearer " + token }
		});
		const user = response.data;
		const userPet = {
			petId: petId,
			userId: user.user_id
		};
		const returnPet = await axios.post(
			"http://localhost:4000/pets/returnPet",
			userPet,
			{ headers: { Authorization: "Bearer " + token } }
			);
			console.log('returnPet:', returnPet.data)
	};

	const handleAdopt = () => {
		changedStatus("Adopted");
		setOwner(true);
	};
	const handleFoster = () => {
		changedStatus("Foster");
		setOwner(true);
	};
	const handleSaveForLater = () => {
		saveForLater();
		setOwner(true);
	};
	const handleReturn = () => {
		returnPet();
		setOwner(false);
	};

	useEffect(() => {
		appContext.setPetStatus(status);
	}, [status]);

	return (
		<>
			<div className="btn-wrapper">
				{owner ? (
					<div>
						<Button onClick={handleReturn} className="btn btn-info">
							Return Pet
						</Button>
					</div>
				) : (
					<div>
						<Button className="btn btn-info" onClick={handleAdopt}>
							Adopt
						</Button>
						<Button className="btn btn-info" onClick={handleFoster}>
							Foster
						</Button>

						<Button className="btn btn-info icon" onClick={handleSaveForLater}>
							<BsHeartFill size="100px" />
						</Button>
					</div>
				)}
			</div>
		</>
	);
}
