import React, { Component } from 'react'
import StepProgressBar from 'react-step-progress'
import 'react-step-progress/dist/index.css'
import CourtRegStep1 from './CourtRegStep1'
import CourtRegStep2 from './CourtRegStep2'
import { Redirect } from 'react-router-dom'
import CourtRegStep3 from './CourtRegStep3'

class CourtRegMaster extends Component {
	state = {
		name: undefined,
		email: undefined,
		phoneNum: undefined,
		selectedCourt: undefined,
		day: undefined,
		time:undefined,
		redirect:false,
	}

	updateState = (id, value) => {
		this.setState({
			[id]: value
		})
	}

	step1Validator = () => {
		if(this.state.name && this.validatePhoneNum(this.state.phoneNum) && this.validateEmail(this.state.email)){
			return true;
		}
		return false;
	}

	validatePhoneNum(phoneNum) {
		return /[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(phoneNum);
	}

	validateEmail(email) {
		return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
	}


	addCourtBooking = () => {
		this.props.addCourtBooking(this.state.selectedCourt, this.state.day, this.state.time)
		this.setState({redirect: true})
	}

	step2Validator = () => {
		if (this.state.day && this.state.time && this.state.selectedCourt) {
			return true;
		}
		return false;
	}

	getState = () => {
		return this.state;
	}

	render() {
        
		const step1Content =<CourtRegStep1 updateState={this.updateState} getInfo = {this.getState}/>
		const step2Content = <CourtRegStep2 updateState={this.updateState} getInfo = {this.getState} courtInfo = {this.props.courts}/>
		const step3Content = <CourtRegStep3 getInfo={this.getState} addCourtBooking = {this.addCourtBooking}/>

		if (this.state.redirect) {
			return <Redirect to={"/courtReg/confirmation"}></Redirect>
		}

		return (
            <div className="container">
                <h4 className="center">Book a court!</h4>
                <StepProgressBar
				startingStep={0}
				steps={[
					{
						label: 'About you',
						name: 'step 1',
						content: step1Content,
						validator: this.step1Validator
					},
					{
						label: 'Select a court',
						name: 'step 2',
						content: step2Content,
						validator: this.step2Validator
					},
					{
						label: 'Review Information',
						name: 'step 3', 
						content: step3Content,
						validator:this.step3Validator
					},
				]}
                primaryBtnClass= {"green darken-3 btn py-0 rounded-corner z-depth-2"}
                secondaryBtnClass={"grey lighten-1 btn py-0 rounded-corner z-depth-2"}
			/>
            </div>
		)
	}
}

export default CourtRegMaster