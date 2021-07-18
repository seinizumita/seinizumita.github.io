import React from 'react'
import { NavLink } from 'react-router-dom'
import header from '../assets/header-im.jpg'

const Home = () => {
	return (
		<div className="container">
			<div className="row mt-150">
				<div className="col s6 left-col">
					<h1 className="center">Meadows Country Club</h1>
					<h4 className="thin-font">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</h4>
                    <NavLink
					className="btn-large green darken-3 rounded-corner z-depth-1 center-button mt-150"
					to="/activities"
				>
					See our activities!
				</NavLink>
				</div>
                <div className="col s6 left-col">
                    <div className="card green darken-3 rounded-corner z-depth-2">
                        <div className="card-content">
                            <img src = {header} className="headerImg"></img>
                        </div>
                    </div>
                </div>
			</div>
		</div>
	)
}

export default Home
