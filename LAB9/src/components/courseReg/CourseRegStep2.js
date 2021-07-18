import React, { Component } from 'react'
import { Select } from 'react-materialize'
import DatePicker from 'react-datepicker'
import moment from 'moment'

class CourseRegStep2 extends Component {
	state = {
		_courses: this.props.courseInfo,
	}

	constructor(props) {
		super(props)
	}
	experienceOptions = [
		{ value: 'beginner', label: 'beginner' },
		{ value: 'intermediate', label: 'intermediate' },
		{ value: 'advanced', label: 'advanced' },
	]

	getInfo = () => {
		return this.props.getInfo()
	}

	handleCourseSelect = (course) => {
		this.setState({
			"selectedCourse" : course.target.value
		})
		this.props.updateState('selectedCourse', course.target.value)
	}

	handleExpChange = (experience) => {
		this.props.updateState('experience', experience.target.value)
		this.setState({ experience: experience.target.value })
	}

	handleDateInput = (date) => {
		this.props.updateState('day', date)
		this.setState({ day: date })
	}

	getCourseOptions() {
		if (!this.state.experience || !this.state.day) {
			return (
				<option value="0" disabled>
					Select the course you would like to join
				</option>
			)
		}
		const allCoursesForExperience = this.state._courses[this.state.experience]

		const courseOptions = allCoursesForExperience.filter((course) => {
			return course.days.includes(this.state.day.getDay())
		}).map(course => {
			return <option value={course.id}>{course.name} - {course.time}</option>
		})

		if(courseOptions.length === 0) {
			return <option value="0" disabled>The day you have selected does not have any courses</option>
		}

		//Add default value
		courseOptions.push(<option value="0" disabled>Select the course you would like to join</option>);

		return courseOptions;
	}

	componentWillMount() {
		this.setState(this.props.getInfo())
	}

	

	render() {

		const isWeekDay = date => {
			const day = date.getDay();
			return day !== 0 && day !== 6
		}

		return (
			<div className="container">
				<h4 className="center">Select a course</h4>
				<div className="row">
					<form>
						<div className="col s6 offset-m3 offset-l3">
							<Select
								id="expSelect"
								className="fullWidth"
								multiple={false}
								options={{
									classes: '',
									dropdownOptions: {
										alignment: 'left',
										autoTrigger: true,
										closeOnClick: true,
										constrainWidth: true,
										coverTrigger: true,
										hover: false,
										inDuration: 150,
										onCloseEnd: null,
										onCloseStart: null,
										onOpenEnd: null,
										onOpenStart: null,
										outDuration: 250,
									},
								}}
								value={this.state.experience ? this.state.experience : "0"}
								onChange={this.handleExpChange}
							>
								<option disabled value="0">
									Select your level of experience
								</option>
								<option value="beginner">Beginner</option>
								<option value="intermediate">Intermediate</option>
								<option value="advanced">Advanced</option>
							</Select>
							<div className="customDatePickerWidth">
								<DatePicker
									selected={this.state.day}
									minDate={new Date()}
									onChange={this.handleDateInput}
									placeholderText={'Select a date'}
									disabled = {!this.state.experience}
									filterDate = {isWeekDay}
									monthsShown={1}
								/>
							</div>
							<Select
								id="courseSelect"
								className="fullWidth"
								multiple={false}
								options={{
									classes: '',
									dropdownOptions: {
										alignment: 'left',
										autoTrigger: true,
										closeOnClick: true,
										constrainWidth: true,
										coverTrigger: true,
										hover: false,
										inDuration: 150,
										onCloseEnd: null,
										onCloseStart: null,
										onOpenEnd: null,
										onOpenStart: null,
										outDuration: 250,
									},
								}}
								disabled = {!this.state.experience || !this.state.day}
								value={this.state.selectedCourse ? this.state.selectedCourse : "0"}
								onChange={this.handleCourseSelect}
							>
								{this.getCourseOptions()}
							</Select>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default CourseRegStep2
