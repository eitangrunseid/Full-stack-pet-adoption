import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import localforage from "localforage";

function SetProfile() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [phone, setPhone] = useState();
	const [bio, setBio] = useState();

	const [updateProfile, setUpdateProfile] = useState({});

	const handleEditProfile = () => {
		setUpdateProfile({
			email: email,
			password: password,
			firstName: firstName,
			lastName: lastName,
			phone: phone,
			bio: bio
		});
	};

	useEffect( async () => {
		const token = await localforage.getItem("token");
		axios.put(`http://localhost:4000/register/updateProfile/`, updateProfile, {
			headers: { "Authorization": "Bearer " + token }
		});
	} , [updateProfile])

	return (
		<>
			<h4>Edit your Profile</h4>
			<Form>
				<Form.Group className="mb-3" controlId="controlInput1">
					<Form.Control
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						type="email"
						placeholder="name@example.com"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="controlInput2">
					<Form.Control
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						type="password"
						placeholder="password"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="controlInput3">
					<Form.Control
						onChange={(e) => {
							setFirstName(e.target.value);
						}}
						type="text"
						placeholder="first-name"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="controlInput4">
					<Form.Control
						onChange={(e) => {
							setLastName(e.target.value);
						}}
						type="text"
						placeholder="last-name"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="controlInput5">
					<Form.Control
						onChange={(e) => {
							setPhone(e.target.value);
						}}
						type="number"
						placeholder="Phone-number"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="controlTextarea1">
					<Form.Control
						onChange={(e) => {
							setBio(e.target.value);
						}}
						as="textarea"
						placeholder="Add some Bio..."
						rows={3}
					/>
				</Form.Group>
				<Button onClick={handleEditProfile} variant="success">
					Edit
				</Button>
			</Form>
		</>
	);
}

export default SetProfile;
