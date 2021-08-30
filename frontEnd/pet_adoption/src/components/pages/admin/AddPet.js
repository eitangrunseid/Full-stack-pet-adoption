import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import localforage from "localforage";

export default function AddPet() {
	const [addPet, setAddPet] = useState({});
	const [petName, setPetName] = useState();
	const [petType, setPetType] = useState();
	const [petHeight, setPetHeight] = useState();
	const [petWeight, setPetWeight] = useState();
	const [petBreed, setPetBreed] = useState();
	const [petImg, setPetImg] = useState();
	const [petColor, setPetColor] = useState();
	const [petHypo, setPetHypo] = useState();
	const [petDiet, setPetDiet] = useState();
	const [petBio, setPetBio] = useState();
	const [petStatus, setPetStatus] = useState();

	const handleImg = (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("upload_preset", "tux1b6jy");
		formData.append("file", file);

		axios
			.post(
				" https://api.cloudinary.com/v1_1/eitangrunseid/image/upload",
				formData
			)
			.then((res) => {
				console.log(res.data);
				setPetImg(res.data.secure_url);
			});
	};

	const handleAddPet = async () => {
		setAddPet({
			name: petName,
			type: petType,
			status: petStatus,
			weight: petWeight,
			height: petHeight,
			breed: petBreed,
			pet_pic: petImg,
			color: petColor,
			hypo: petHypo,
			diet: petDiet,
			bio: petBio
		});
	
	};

	useEffect(async () => {
		if (petName && petType && petStatus && petBreed) {
			const token = await localforage.getItem("token");
			axios
				.post("http://localhost:4000/pets/addPet", addPet, {
					headers: { "Authorization": "Bearer " + token }
				})
				.then((response) => {
					console.log(response.data);
				});
		}
	}, [addPet])

	return (
		<div>
			<Form>
				<Form.Group className="mb-3">
					<Form.Label>Name</Form.Label>
					<Form.Control
						onChange={(e) => setPetName(e.target.value)}
						type="text"
						placeholder="Pet name"
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Type</Form.Label>
					<Form.Control
						onChange={(e) => setPetType(e.target.value)}
						type="text"
						placeholder="Dog, Fish, Cat, Brother"
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Status</Form.Label>
					<Form.Control
						onChange={(e) => setPetStatus(e.target.value)}
						type="text"
						placeholder="status"
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Height</Form.Label>
					<Form.Control
						onChange={(e) => setPetHeight(e.target.value)}
						type="text"
						placeholder="In cm. Example: 60cm"
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Weight</Form.Label>
					<Form.Control
						onChange={(e) => setPetWeight(e.target.value)}
						type="text"
						placeholder="In kg. Example: 15kg"
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Breed</Form.Label>
					<Form.Control
						onChange={(e) => setPetBreed(e.target.value)}
						type="text"
						placeholder="Example: Pitbul, Calico, Syrian Hamster"
					/>
				</Form.Group>
				<Form.Group controlId="formFile" className="mb-3">
					<Form.Label>Please upload image</Form.Label>
					<Form.Control
						onChange={(e) => {
							handleImg(e);
						}}
						type="file"
					/>
				</Form.Group>
				<div className="add-pet-checkboxes">
					<Form.Group className="mb-3">
						<Form.Label>Color</Form.Label>
						<Form.Control
							onChange={(e) => setPetColor(e.target.value)}
							type="text"
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Hypoallergenic </Form.Label>
						<Form.Check
							onChange={(e) => setPetHypo(e.target.value)}
							value="Yes"
							type="radio"
							name="group1"
							label="Yes"
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Dietry</Form.Label>
						<Form.Check
							onChange={(e) => setPetDiet(e.target.value)}
							value="Yes"
							type="radio"
							name="group2"
							label="Yes"
						/>
					</Form.Group>
				</div>
				<Form.Group className="mb-3">
					<Form.Label>Bio</Form.Label>
					<Form.Control
						onChange={(e) => setPetBio(e.target.value)}
						as="textarea"
						rows={3}
					/>
				</Form.Group>
				<Button onClick={handleAddPet} className="btn btn-success add-pet-btn">
					Add pet
				</Button>
			</Form>
		</div>
	);
}
