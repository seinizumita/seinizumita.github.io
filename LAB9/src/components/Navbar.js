import React from 'react'
import {useTranslation} from "react-i18next";
import {NavLink, BrowserRouter as Router } from 'react-router-dom'

const Navbar = (props) => {

	const {t} = useTranslation('common');
	return (
		<nav className="nav-wrapper green darken-2">
				<div className="container">
					<NavLink exact to="/" className="brand-logo left">
						Meadows Country Club
					</NavLink>
					<ul className="right">
						<li className="">
							<NavLink to="/activities">{t("Activities")}</NavLink>
						</li>
						<li className="">
							<NavLink to="/lfg">{t("Find Others")}</NavLink>
						</li>
						<li className="">
							<NavLink to="/about">{t("About Us")}</NavLink>
						</li>
					</ul>
				</div>
		</nav>
	)
}

export default Navbar
