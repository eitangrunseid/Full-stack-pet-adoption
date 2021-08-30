import React from "react";
import { ListGroup } from "react-bootstrap";
import "./PetInfo.css";
import PetAdoptButtons from "./PetAdoptButtons";

export default function PetInfo({ pet }) {

	return (
		<div>
			<div className="pet-img-info">
				<div className="pet-info-ul">
					<ListGroup variant="flush" className="ul">
						<ListGroup.Item>Name: {pet.name}</ListGroup.Item>
						<ListGroup.Item>Type: {pet.type}</ListGroup.Item>
						<ListGroup.Item>Height: {pet.height}</ListGroup.Item>
						<ListGroup.Item>Wight: {pet.weight}</ListGroup.Item>
						<ListGroup.Item>Color: {pet.color}</ListGroup.Item>
						<ListGroup.Item>Hypo: {pet.hypo}</ListGroup.Item>
						<ListGroup.Item>Dietry: {pet.diet}</ListGroup.Item>
						<ListGroup.Item>Breed: {pet.breed}</ListGroup.Item>
					</ListGroup>

					<div className="pet-img-status">
						<img className="pet-img" src={pet.pet_pic} alt="Third slide" />
						<div className="adoption-status">{pet.status}</div>
					</div>
				</div>
			</div>
			<div className="bio">
				<h4>Bio:</h4>
				<p>{pet.bio}</p>
			</div>
			<PetAdoptButtons petId={pet.pet_id}  pet={pet}  />
		</div>
	);
}
