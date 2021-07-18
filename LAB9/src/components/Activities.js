import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Collapsible, CollapsibleItem, Table } from 'react-materialize'
import { withTranslation } from 'react-i18next'
import { Select } from 'react-materialize'

class Activities extends Component {
	state = {
		lang: 'en',
	}

	weekdays = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	]

	months = [
		'January',
		'Febuary',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]

	timeSlots = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

	generateAvailabilitiesTable = (courtID, courtInfo, t) => {
		const current = new Date()
		const courtBookings = courtInfo.filter((court) => court.id == courtID)[0]
			.bookings
		const currentDay = current.getDay()
		current.setDate(current.getDate() - currentDay + (currentDay == 0 ? -6 : 1))
		current.setHours(0, 0, 0, 0)
		const week = new Array()
		for (var i = 0; i < 5; i++) {
			week.push(new Date(current))
			current.setDate(current.getDate() + 1)
		}

		return (
			<Table className="customTable centered white">
				<thead className="grey lighten-2">
					<tr>
						{week.map((day) => {
							return (
								<th>
									<h6>
										{t(this.weekdays[day.getDay()]) +
											' ' +
											t(day.getDate()) +
											' ' +
											t(this.months[day.getMonth()]) +
											' ' +
											t(day.getFullYear())}
									</h6>
								</th>
							)
						})}
					</tr>
				</thead>
				<tbody>
					{this.timeSlots.map((timeSlot) => {
						return this.getAvailabilitiesForTimeSlot(
							timeSlot,
							week,
							courtBookings,
							t
						)
					})}
				</tbody>
			</Table>
		)
	}

	getAvailabilitiesForTimeSlot = (timeSlot, week, bookings, t) => {
		const bookingsForTimeSlot = bookings.filter(
			(booking) => booking.time === timeSlot
		)
		const daysBooked = bookingsForTimeSlot.map((booking) => {
			return booking.day
		})
		return (
			<tr>
				{week.map((day) => {
					const match = daysBooked.find((d) => {
						return (
							d.getDate() === day.getDate() &&
							d.getMonth() === day.getMonth() &&
							d.getFullYear() === day.getFullYear()
						)
					})
					const hasMatch = !!match
					return (
						<td className={hasMatch ? 'red lighten-2' : ''}>
							<h6 className="thin-font">{timeSlot}</h6>
							<p className="thin-font">
								{t(hasMatch ? 'Booked' : 'Available')}
							</p>
						</td>
					)
				})}
			</tr>
		)
	}

	getCoursesforDifficulty = (experience, t) => {
		const courses = this.props.courseInfo[experience]

		const collapsibles = courses.map((course) => {
			const days = course.days.map((day) => {
				return this.weekdays[day]
			})
			return (
				<CollapsibleItem
					className="grey lighten-3"
					expanded={false}
					header={<p className="thin-font">{t(course.name)}</p>}
					node="div"
					icon={<i className="material-icons">arrow_drop_down</i>}
					key={course.id}
				>
					<div className="row">
						<div className="col">
							<p>{t('Course' + course.id + 'Desc')}</p>
						</div>
					</div>
					<div className="row">
						<div className="col s6">
							<p>
								<b>{t('Days', { framework: 'React' }) + ' '} </b>
								{days.map(day => {return t(day)}).join(', ')}
							</p>
						</div>
						<div className="col s6">
							<p>
								<b>{t('Time') + ' '} </b>
								{course.time}
							</p>
						</div>
						<div className="col s6">
							<p>
								<b>{t('Instructor') + ' '} </b>
								{course.instructor}
							</p>
						</div>
					</div>
				</CollapsibleItem>
			)
		})
		return collapsibles
	}

	handleChangeLang = (e) => {
		this.props.changeLanguage(e.target.value)
	}

	componentWillMount() {
		this.setState({lang: this.props.lang})
	}

	render() {
		const { t } = this.props
		const courts = this.props.courts
		const bookings = this.props.bookings
		const courtTables = courts.map((court) => {
			return (
				<div className="row" key={court.id}>
					<div className="card green darken-3 rounded-corner z-depth-2 limit-height">
						<div className="card-content">
							<span className="card-title white-text">
								{t('Court') + ' ' + court.id}
							</span>
							{this.generateAvailabilitiesTable(court.id, courts, t)}
						</div>
					</div>
				</div>
			)
		})
		return (
			<div className="container">
				<div className="select-container">
					<Select
						id="langSelect"
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
						value={this.state.lang}
						onChange={this.handleChangeLang}
					>
						<option value="en">English</option>
						<option value="fr">French</option>
					</Select>
				</div>
				<h4 className="center">{t('Activities')}</h4>
				<div className="row">
					<div className="col s6 left-col">
						<div className="row col-content">
							<h4 className="center">{t('Courses')}</h4>
							<div className="card green darken-3 rounded-corner z-depth-2">
								<div className="card-content">
									<span className="card-title white-text">
										{t('Beginner Courses')}
									</span>
									<Collapsible>
										{this.getCoursesforDifficulty('beginner', t)}
									</Collapsible>
								</div>
							</div>
						</div>
						<div className="row col-content">
							<div className="card green darken-3 rounded-corner z-depth-2">
								<div className="card-content">
									<span className="card-title white-text">
										{t('Intermediate Courses')}
									</span>
									<Collapsible>
										{this.getCoursesforDifficulty('intermediate', t)}
									</Collapsible>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="card green darken-3 rounded-corner z-depth-2">
								<div className="card-content">
									<span className="card-title white-text">
										{t('Advanced Courses')}
									</span>
									<Collapsible>
										{this.getCoursesforDifficulty('advanced', t)}
									</Collapsible>
								</div>
							</div>
						</div>
						<NavLink
							className="btn-large green darken-3 right rounded-corner z-depth-1"
							to="/courseReg"
						>
							{t("Join a course")}
						</NavLink>
					</div>
					<div className="col s6 right-col">
						<h4 className="center">{t('Court Availabilities')}</h4>
						{courtTables}
						<NavLink
							className="btn-large green darken-3 right rounded-corner z-depth-1"
							to="/courtReg"
						>
							{t('Book a court!')}
						</NavLink>
					</div>
				</div>
			</div>
		)
	}
}

export default withTranslation('common')(Activities)
