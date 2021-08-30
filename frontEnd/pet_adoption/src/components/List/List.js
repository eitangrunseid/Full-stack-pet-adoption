import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import PetInfo from "../PetInfo/PetInfo";

export default function List(props) {
	const { pet, idx, isOwner } = props;
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}

	return (
		<div>
			<div className="container1" key={idx} onClick={() => handleShow(pet)}>
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
				</div>
				<button className="info-btn">
					more info <i className="fa fa-arrow-right"></i>
				</button>
			</div>

			<Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title className="pet-title">{pet.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<PetInfo pet={pet} isOwner={isOwner} />
				</Modal.Body>
			</Modal>
		</div>
	);
}
