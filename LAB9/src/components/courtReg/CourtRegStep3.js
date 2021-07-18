import React from 'react'

const CourtRegStep3 = (props) => {
    const info = props.getInfo();
    return(
        <div className="container">
            <h3 className="center">
                Review information
            </h3>
            <div className="row">
                <div className="col s6"> 
                <h5> Name: {info.name} </h5>
                </div>
                <div className="col s6">
                    <h5>
                        Court: {info.selectedCourt}
                    </h5>
                </div>
            </div>
            <div className="row">
                <div className="col s6"> 
                <h5> Phone Number {info.phoneNum} </h5>
                </div>
                <div className="col s6">
                    <h5>
                        Date: {info.day.getDate() + "/" + (info.day.getMonth() + 1) + "/" + info.day.getFullYear()}
                    </h5>
                </div>
            </div>
            <div className="row">
                <div className="col s6"> 
                <h5> Email: {info.email} </h5>
                </div>
                <div className="col s6">
                    <h5>
                        Time: {info.time}
                    </h5>
                </div>
            </div>
            <div className="row">
				<div className="col s6 reg-centering">
					<button className="btn-large green darken-3 rounded-corner z-depth-2" onClick={props.addCourtBooking}>
						Submit booking
					</button>
				</div>
			</div>
        </div>
    )
}

export default CourtRegStep3