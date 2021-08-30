import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ButtonGroup } from "react-bootstrap";

import "../../../App.css";
import "./home.css";
import AppContext from "../../../context/AppContext";
import localforage from "localforage";
import axios from "axios";

function Homepage() {

	const appContext = useContext(AppContext);

	useEffect(async () => {
		try {
			const token = await localforage.getItem("token");
				axios
					.get(`http://localhost:4000/users/user`, {
						headers: { "Authorization": "Bearer "+ token }
					})
					.then((response) => {
						appContext.setUser(response.data);
						appContext.setUserLogin(true)
					});
		} catch (err) {
			console.log(err);
		}
	}, []);


	return (
		<>
			{appContext.userLogin ? (
				<div className="section1">
					
					<h1 className="welcome">Welcome {appContext.user.first_name}!</h1>
					<div className="home">
						<div className="user-btn">
							<ButtonGroup
								size="large"
								color="primary"
								aria-label="large outlined primary button group"
							>
								<Link id="btn-link" to="/search">
									<button className="button">Search for a Pet 🦄</button>
								</Link>
								<Link id="btn-link" to="/myPets">
									<button className="button">My Pets 🦍</button>
								</Link>
								<Link id="btn-link" to="/MyLikedPets">
									<button className="button">Liked Pets 😍</button>
								</Link>
							</ButtonGroup>
						</div>
					</div>
				</div>
			) : (
				<div>
					<div className="home">
						{appContext.logOut && (
							<div className="home">
								<h1>thanks for your time</h1>
								<p>good bye have a nice day!</p>
							</div>
						)}
						<h1>Welcome!</h1>
						<h3>
							This is the place where you can adopt/foster a cute pet...
							<br></br>
							make an impact on the world,<br></br>
							and show the world that you could make it a better place.
						</h3>
					</div>
				</div>
			)}
		</>
	);
}

export default Homepage;
