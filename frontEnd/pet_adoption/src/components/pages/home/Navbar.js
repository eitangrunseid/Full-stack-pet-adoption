import React, { useContext } from "react";

import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { BsList } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../App.css";
import "./home.css";

import LoginModal from "../../register/LoginModal";
import { Link } from "react-router-dom";
import AppContext from "../../../context/AppContext";
import localforage from "localforage";

function HomepageNavbar() {

	const appContext = useContext(AppContext);

	return (
		<Navbar style={{ backgroundColor: "#fffff" }} variant="info">
			<Container className="nav-container">
				<Nav.Link>
					<Link to="/" className="brand tracking-in-expand">
						GetYourPet
					</Link>
				</Nav.Link>
				<Nav className="me-auto d-flex justify-content-around login">
					{appContext.userLogin ? (
						<Nav.Link>
							<Dropdown
								className="nav-dropdown"
								id="navbarScrollingDropdown"
								drop="start"
							>
								<Dropdown.Toggle className="nav-dropdown" id="dropdown-start">
									<BsList />
								</Dropdown.Toggle>

								<Dropdown.Menu className="nav-dropdown">
									<Dropdown.Item id="drop">
										<Nav.Link as={Link} to="/" className="nav-dropdown-item">
											Home
										</Nav.Link>
									</Dropdown.Item>
									<Dropdown.Item id="drop">
										<Nav.Link
											as={Link}
											to="/search"
											className="nav-dropdown-item"
										>
											Search
										</Nav.Link>
									</Dropdown.Item>
									<Dropdown.Item id="drop">
										<Nav.Link
											as={Link}
											to="/editProfile"
											className="nav-dropdown-item"
										>
											Edit Profile
										</Nav.Link>
									</Dropdown.Item>
									<Dropdown.Item id="drop">
										<Nav.Link
											as={Link}
											to="/myPets"
											className="nav-dropdown-item"
										>
											My Pets
										</Nav.Link>
									</Dropdown.Item>
									<Dropdown.Item id="drop">
										<Nav.Link
											as={Link}
											to="/myLikedPets"
											className="nav-dropdown-item"
										>
											Liked Pets
										</Nav.Link>
									</Dropdown.Item>
									{appContext.isAdmin && (
										<Dropdown.Item id="drop">
											<Nav.Link
												as={Link}
												to="/admin"
												className="nav-dropdown-item"
											>
												Admin
											</Nav.Link>
										</Dropdown.Item>
									)}
									<Dropdown.Divider className="divider" />
									<Dropdown.Item id="drop">
										<Nav.Link
											as={Link}
											to="/LogOut"
											className="nav-dropdown-item"
											onClick={() => {
												localforage.removeItem("token");
												appContext.setUserLogin(false);
												appContext.setLogOut(true);
											}}
										>
											Log Out
										</Nav.Link>
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Nav.Link>
					) : (
						<Nav variant="info">
							<Nav.Link
								as={Link}
								to="/LoginModal"
								className="nav-dropdown-item"
							>
								<LoginModal />
							</Nav.Link>
						</Nav>
					)}
				</Nav>
			</Container>
		</Navbar>
	);
}

export default HomepageNavbar;
