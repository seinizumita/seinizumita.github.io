import React, { Component } from 'react'
import StepProgressBar from 'react-step-progress'
import 'react-step-progress/dist/index.css'
import { Redirect } from 'react-router-dom'
import CourseRegStep1 from './CourseRegStep1'
import CourseRegStep2 from './CourseRegStep2'
import CourseRegStep3 from './CourseRegStep3'

class CourtRegMaster extends Component {
	state = {
		name: undefined,
		email: undefined,
		phoneNum: undefined,
		selectedCourse: undefined,
		day: undefined,
		time: undefined,
		redirect: false,
		experience: undefined,
	}

	updateState = (id, value) => {
		this.setState({
			[id]: value,
		})
	}

	getCourseInfo = (id) => {
		var courseFound
		this.props.courseInfo[this.state.experience].forEach(course => {
			if (course.id == id){
				courseFound = course
			}
		})
		return courseFound
	}

	step1Validator = () => {
		if(this.state.name && this.validatePhoneNum(this.state.phoneNum) && this.validateEmail(this.state.email)){
			return true;
		}
		return false;
	}

	step2Validator = () => {
		if(this.state.experience && this.state.day && this.state.selectedCourse) {
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

	step3Validator = () => {
		this.setState({
			redirect: true,
		})
		return true
	}

	getState = () => {
		return this.state
	}

	render() {
		const step1Content =<CourseRegStep1 updateState={this.updateState} getInfo = {this.getState}/>
		const step2Content = <CourseRegStep2 updateState={this.updateState} getInfo = {this.getState} courseInfo = {this.props.courseInfo} />
		const step3Content = <CourseRegStep3 getInfo={this.getState} getCourseInfo = {this.getCourseInfo}/>

		console.log(this.state);

		if (this.state.redirect) {
			return <Redirect to={"/courtReg/confirmation"}></Redirect>
		}

		return (
            <div className="container">
                <h4 className="center">Join a course</h4>
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
