import React from 'react'
import image from '../assets/404-image.jpg'
import { NavLink } from 'react-router-dom'

const PageNotFound = (props) => {
	return (
		<div className="container vertical-align center-align max-height">
			<div className="row">
				<img src={image} alt="404-image" />
			</div>
			<div className="col s6 offset-m3 offset-l3">
				<h1>OUT!</h1>
				<h4 className="thin-font">
					It seems we've made an unforced error! Click below to return to home
				</h4>
				<NavLink
					className="btn-large green darken-3 rounded-corner z-depth-1"
					to="/"
				>
					Return to home
				</NavLink>
			</div>
		</div>
	)
}

export default PageNotFound
