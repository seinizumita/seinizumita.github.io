import React from 'react'
import {NavLink} from 'react-router-dom'
const CourseRegStep3 = (props) => {
	const info = props.getInfo()
	const course = props.getCourseInfo(info.selectedCourse)
	return (

		<div className="container">
			<h3 className="center">Review information</h3>
			<div className="row">
				<div className="col s6">
					<h5> Name: {info.name} </h5>
				</div>
				<div className="col s6">
					<h5>Course: {course.name}</h5>
				</div>
			</div>
			<div className="row">
				<div className="col s6">
					<h5> Phone Number {info.phoneNum} </h5>
				</div>
				<div className="col s6">
					<h5> Instructor: {course.instructor}</h5>
				</div>
			</div>
			<div className="row">
				<div className="col s6">
					<h5> Email: {info.email} </h5>
				</div>
				<div className="col s6">
					<h5>Time: {course.time}</h5>
				</div>
			</div>
			<div className="row">
				<div className="col s6">
					<h5>
						Date:{' '}
						{info.day.getDate() +
							'/' +
							(info.day.getMonth() + 1) +
							'/' +
							info.day.getFullYear()}
					</h5>
				</div>
			</div>
			<div className="row">
				<div className="col s6 reg-centering">
					<NavLink className="btn-large green darken-3 rounded-corner z-depth-2" to="/courseReg/confirmation">
						Submit registration
					</NavLink>
				</div>
			</div>
		</div>
	)
}

export default CourseRegStep3
