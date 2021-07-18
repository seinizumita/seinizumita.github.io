import React, { Component } from 'react'

class CourseRegStep1 extends Component {

	constructor(props) {
		super(props)
		this.state = this.props.getInfo();
	}

	handleChange = (e) => {
		this.props.updateState(e.target.id, e.target.value)
	}

	render() {
		return (
			<div className="container">
				<h4 className="center">About you</h4>
				<h5>{this.getErrorMessage}</h5>
				<div className="row">
					<form className="col s6 offset-m3 offset-l3">
						<div className="row">
							<div className="input-field">
								<i className="material-icons prefix">account_circle</i>
								<input
									placeholder="Name"
									id="name"
									type="text"
									className="validate"
									onChange={this.handleChange}
									defaultValue={this.state.name}
								/>
								<label className="active" htmlFor="first_name">
									Name
								</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field">
								<i className="material-icons prefix">local_phone</i>
								<input
									placeholder="123-456-7890"
									id="phoneNum"
									type="tel"
									className="validate"
									pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
									onChange={this.handleChange}
									defaultValue={this.state.phoneNum}
								/>
								<label className="active" htmlFor="phoneNum">
									Phone Number
								</label>
								<span className="helper-text" data-error="Please enter a valid phone number (XXX-XXX-XXXX)"></span>
							</div>
						</div>
						<div className="row">
							<div className="input-field">
								<i className="material-icons prefix">email</i>
								<input
									placeholder="Email Address"
									id="email"
									type="email"
									className="validate"
									onChange={this.handleChange}
									defaultValue={this.state.email}
								/>
								<label className="active" htmlFor="email">
									Email Address
								</label>
								<span className="helper-text" data-error="Please enter a valid email"></span>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default CourseRegStep1
