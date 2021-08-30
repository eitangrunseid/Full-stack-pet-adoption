import React, { useState, useEffect, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import axios from "axios";
import AppContext from "../../context/AppContext";
import localforage from "localforage";

function LoginModal() {
	const [show, setShow] = useState(false);
	const [register, setRegister] = useState(true);
	const [loginEmail, setLoginEmail] = useState();
	const [loginPassword, setLoginPassword] = useState();
	const [signUpFirstName, setSignUpFirstName] = useState();
	const [signUpLastName, setSignUpLastName] = useState();
	const [signUpEmail, setSignUpEmail] = useState();
	const [signUpPassword, setSignUpPassword] = useState();
	const [signUpVerify, setSignUpVerify] = useState();
	const [signUpPhone, setSignUpPhone] = useState();

	const [redirect, setRedirect] = useState(false);

	const [login, setLogin] = useState({
		email: "",
		password: ""
	});

	const [signUp, setSignUp] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		verify_password: "",
		phone: ""
	});

	const appContext = useContext(AppContext);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleLogin = () => {
		setLogin({
			email: loginEmail,
			password: loginPassword
		});
	};
	const handleSignUp = () => {
		setSignUp({
			firstName: signUpFirstName,
			lastName: signUpLastName,
			email: signUpEmail,
			password: signUpPassword,
			verify_password: signUpVerify,
			phone: signUpPhone
		});
	};

	useEffect(async () => {
			
			const response = await axios
			.post("http://localhost:4000/register/signUp", signUp)
			if (response.data) {
				setRedirect(true);
				handleClose(true);
				appContext.setUserLogin(true);
				appContext.setUser(response.data.user);
				appContext.setUserId(response.data.user_id);
				localforage.setItem("token", response.data.token);
			}
	}, [signUp]);

	useEffect(async () => {

			const response = await axios
			.post("http://localhost:4000/register/login", login)
			appContext.setUser(response.data.user);
			appContext.setUserId(response.data.user_id);
			setRedirect(true);
			handleClose(true);
			appContext.setUserLogin(true);
			localforage.setItem("token", response.data.token);
	}, [login]);

	return (
		<>
			<Button variant="dark" onClick={handleShow}>
				Login/SignUp
			</Button>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>{register ? "Login" : "SignUp"}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{register ? (
						<Login
							setRegister={setRegister}
							setLoginEmail={setLoginEmail}
							setLoginPassword={setLoginPassword}
						/>
					) : (
						<SignUp
							setRegister={setRegister}
							setSignUpFirstName={setSignUpFirstName}
							setSignUpLastName={setSignUpLastName}
							setSignUpEmail={setSignUpEmail}
							setSignUpPassword={setSignUpPassword}
							setSignUpVerify={setSignUpVerify}
							setSignUpPhone={setSignUpPhone}
						/>
					)}
				</Modal.Body>
				<Modal.Footer>
					{register ? (
						<Button onClick={handleLogin} variant="primary" type="submit">
							Login
						</Button>
					) : (
						<Button onClick={handleSignUp} variant="primary" type="submit">
							Sign-Up
						</Button>
					)}
				</Modal.Footer>
			</Modal>
			{redirect && <Redirect to="/" />}
		</>
	);
}

export default LoginModal;
