import React from "react";

import { Form } from "react-bootstrap";

function SignUp(props) {
	const {
		setRegister,
		setSignUpFirstName,
		setSignUpLastName,
		setSignUpPassword,
		setSignUpEmail,
		setSignUpVerify,
		setSignUpPhone,
	} = props;

	const handleHaveAnAccount = () => {
		setRegister(true);
	};

	return (
		<>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicFirstName">
					<Form.Control
						type="text"
						onChange={(e) => {
							setSignUpFirstName(e.target.value);
						}}
						placeholder="First name"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicLastName">
					<Form.Control
						type="text"
						onChange={(e) => {
							setSignUpLastName(e.target.value);
						}}
						placeholder="Last name"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Control
						type="email"
						onChange={(e) => {
							setSignUpEmail(e.target.value);
						}}
						placeholder="Email"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="Phone">
					<Form.Control
						type="text"
						onChange={(e) => setSignUpPhone(e.target.value)}
						placeholder="Phone number"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Control
						type="password"
						onChange={(e) => setSignUpPassword(e.target.value)}
						placeholder="Password"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Control
						type="password"
						onChange={(e) => setSignUpVerify(e.target.value)}
						placeholder="Verify Password"
					/>
				</Form.Group>
				<div className="d-flex ml-2">
					<p> have an account?</p>
					<a className="not-register-link" onClick={handleHaveAnAccount}>
						Login
					</a>
				</div>
			</Form>
		</>
	);
}

export default SignUp;
