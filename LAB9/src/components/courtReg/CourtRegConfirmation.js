import React from 'react'
import {NavLink} from 'react-router-dom'


const CourtRegConfirmation = (props) => {

    return (
        <div className="container vertical-align center-align max-height">
			<div className="row">
				<i className="material-icons extra-large-icon">check</i>
			</div>
			<div className="row">
				<div className="col s6 offset-m3 offset-l3">
					<h4>
						Success! You have booked the court. A confirmation email
						has been sent to you.
					</h4>
					<NavLink className="btn-large green darken-3 rounded-corner z-depth-2" to="/">
						Return to Home
					</NavLink>
				</div>
			</div>
		</div>
    )
}

export default CourtRegConfirmation