import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Homepage from "./components/pages/home/Homepage";
import SignUp from "./components/register/SignUp";
import HomepageNavbar from "./components/pages/home/Navbar";
import PetInfo from "./components/PetInfo/PetInfo";
import MyPets from "./components/MyPets/MyPets";
import Search from "./components/pages/search/Search";
import Admin from "./components/pages/admin/Admin";
import MyLikedPets from './components/MyPets/MyLikedPets'
import SetProfile from "./components/userProfile/SetProfile";
import localforage from "localforage";
import axios from "axios";
import AppContext from "./context/AppContext";

function App() {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState(false);
	const [logIn, setLogIn] = useState(false);
	const [nameSearch, setNameSearch] = useState();
	const [userId, setUserId] = useState();
	const [userLogin, setUserLogin] = useState(false);
	const [petList, setPetList] = useState([]);
	const [petStatus, setPetStatus] = useState();
	const [logOut, setLogOut] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [w, setW] = useState();

	const [advancedSearch, setAdvancedSearch] = useState({
		status: "",
		weight: "",
		height: "",
		type: ""
	});

	const loginOnLoad = async (token) => {
		
		const response = await axios.get(`http://localhost:4000/users/user`, {
			headers: { "Authorization": "Bearer " + token }
		});
		const data = response.data
		setW(data);
		setUserLogin(true)
		if (data.is_admin) {
			setIsAdmin(true)
		}
		
	};

	useEffect(() => {
		try {
			localforage.getItem("token", async (err, value) => {
				if (err) {
					return console.log(err);
				}
				if (value) {
					const user = await loginOnLoad(value);
					if (user) {
						setUser(user);
						setUserLogin(user);
					}
				}
			});
		} catch (e) {
			console.log(e);
		}
	}, []);

	return (
		<Router>
			<AppContext.Provider
				value={{
					users: users,
					setUsers: setUsers,
					user: user,
					setUser: setUser,
					logIn: logIn,
					setLogIn: setLogIn,
					petList: petList,
					setPetList: setPetList,
					nameSearch: nameSearch,
					setNameSearch: setNameSearch,
					advancedSearch: advancedSearch,
					setAdvancedSearch: setAdvancedSearch,
					userId: userId,
					setUserId: setUserId,
					userLogin: userLogin,
					setUserLogin: setUserLogin,
					logOut: logOut,
					setLogOut: setLogOut,
					w: w,
					setW: setW,
					petStatus: petStatus,
					setPetStatus: setPetStatus,
					isAdmin: isAdmin,
					setIsAdmin: setIsAdmin,
				}}
			>
				<div className="App">
					<HomepageNavbar />
				</div>
				<Switch>
					<Route path="/search">
						<Search />
					</Route>
					{isAdmin && (
						<Route path="/admin">
							<Admin />
						</Route>
					)}
					<Route exact path="/pet/:id">
						<PetInfo />
					</Route>
					<Route exact path="/editProfile">
						<SetProfile />
					</Route>
					<Route path="/SignUp">
						<SignUp />
					</Route>
					<Route path="/myPets">
						<MyPets />
					</Route>
					<Route path="/myLikedPets">
						<MyLikedPets />
					</Route>
					<Route path="/">
						<Homepage />
					</Route>
				</Switch>
			</AppContext.Provider>
		</Router>
	);
}

export default App;
