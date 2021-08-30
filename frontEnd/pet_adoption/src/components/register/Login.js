import React from "react";

import { Form } from "react-bootstrap";

function Login(props) {
	
	const { setRegister, setLoginEmail, setLoginPassword } = props;

	const handleRegister = () => {
		setRegister(false);
	};

	const handleEmail = (e) => {
		setLoginEmail(e.target.value);
	};
	const handlePassword = (e) => {
		setLoginPassword(e.target.value);
	};

	return (
		<>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Control
						type="email"
						onChange={handleEmail}
						placeholder="Enter email"
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="Phone">
					<Form.Control
						type="password"
						onChange={handlePassword}
						placeholder="password"
					/>
				</Form.Group>
			</Form>
			<div className="d-flex">
				<p> Not register?</p>
				<a className="not-register-link" onClick={handleRegister}>
					Sign-Up
				</a>
			</div>
		</>
	);
}

export default Login;
