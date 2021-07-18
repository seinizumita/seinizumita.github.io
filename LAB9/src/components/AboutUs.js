import React from 'react'
import groupImg from '../assets/aboutUs.jpg'
import kids from '../assets/kids.JPG'

const AboutUs = () => {
	return (
		<div className="container">
			<h2 className="center">About Us</h2>
			<div className="row">
				<div className="col s6 offset-m3 offset-l3">
					<h4 className="thin-font">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
						quibusdam odit architecto quo ducimus dolorem omnis magnam eaque
						laborum. Distinctio minima labore doloremque voluptatem molestias
						autem assumenda sunt vel beatae.
					</h4>
				</div>
			</div>
			<div className="row">
				<div className="className col s6">
					<div className="card green darken-3 rounded-corner z-depth-2">
						<div className="card-content">
							<img className="limitPhoto" src={groupImg}></img>
						</div>
					</div>
				</div>
                <div className="className col s6">
					<div className="card green darken-3 rounded-corner z-depth-2">
						<div className="card-content">
							<img className="limitPhoto center" src={kids}></img>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AboutUs
