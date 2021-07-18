import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import { Select } from 'react-materialize'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

class CourtRegStep2 extends Component {
	constructor(props) {
		super(props)
	}

	changeCourt = async (e) => {
		this.props.updateState('selectedCourt', e.target.value)
		this.props.updateState('day', null)
		this.props.updateState('time', null)
		await this.setState({
			selectedCourt: e.target.value,
			time: null,
			day: null,
		})
	}

	handleDateInput = (date) => {
		this.setState({
			day: date,
			time: null,
		})
		this.props.updateState('day', date)
		this.props.updateState('time', null)
	}

	handleTimeInput = (e) => {
		this.props.updateState('time', e.target.value)
	}

	getSelectedCourtBookings(courtId) {
		if (!this.state.selectedCourt) {
			return []
		}
		return this.state.courtInfo.filter(
			(court) => courtId == this.state.selectedCourt
		)[0].bookings
	}

	getExcludedDates() {
		//If no court has been selected we don't exclude any days
		if (!this.state.selectedCourt) {
			return []
		}

		var selectedCourtBookings = this.state.courtInfo.filter(
			(court) => court.id == this.state.selectedCourt
		)[0].bookings

		var dayCount = {}
		var excludedDates = []

		selectedCourtBookings.forEach((booking) => {
			const date = booking.day
			date.setHours(0, 0, 0, 0)
			if (dayCount.hasOwnProperty(date)) {
				dayCount[date] += 1
			} else {
				dayCount[date] = 1
			}

			if (dayCount[date] == 6) {
				excludedDates.push(date)
			}
		})
		return excludedDates
	}

	getValidTimes() {
		if (!this.state.selectedCourt || !this.state.day) {
			return (
				<option value="0" disabled>
					Select a time
				</option>
			)
		}

		var selectedCourtBookings = this.state.courtInfo.filter(
			(court) => court.id == this.state.selectedCourt
		)[0].bookings

		var courtBookingsForDay = selectedCourtBookings.filter((booking) => {
			booking.day.setHours(0, 0, 0, 0)
			this.state.day.setHours(0, 0, 0, 0)
			console.log(booking.day.valueOf() === this.state.day.valueOf())
			return booking.day.valueOf() === this.state.day.valueOf()
		})

		var bookingTimes = courtBookingsForDay.map((booking) => {
			return booking.time
		})

		var _times = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
		var availTimes = []

		_times.forEach((time) => {
			if (!bookingTimes.includes(time)) {
				availTimes.push(time)
			}
		})
		
		const htmlAvailTimes = availTimes.map((time) => {
			return <option value={time}>{time}</option>
		})

		htmlAvailTimes.push(<option value="0" disabled> Select a time</option>);

		return htmlAvailTimes
	}

	componentWillMount() {
		this.setState({ courtInfo: this.props.courtInfo })
		this.setState(this.props.getInfo())
	}

	render() {
		return (
			<div className="container">
				<h4 className="center">Select a court</h4>
				<div className="row">
					<form>
						<div className="col s6 offset-m3 offset-l3">
							<p>
								<label>
									<input
										name="group1"
										value="1"
										type="radio"
										onClick={this.changeCourt}
									/>
									<span>Court 1</span>
								</label>
							</p>
							<p>
								<label>
									<input
										name="group1"
										value="2"
										type="radio"
										onClick={this.changeCourt}
									/>
									<span>Court 2</span>
								</label>
							</p>
							<label> Select a date</label>
							<br />
							<div className="customDatePickerWidth">
							<DatePicker
								minDate={new Date()}
								maxDate={moment().endOf('week').toDate()}
								onChange={this.handleDateInput}
								disabled={!this.state.selectedCourt}
								excludeDates={this.getExcludedDates()}
								selected={this.state.day}
								placeholderText={'Select a date'}
							/>
							</div>
							<br />
							<label>Select a time, all bookings are for one hour</label>
							<Select
								id="time"
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
								value="0"
								onChange ={this.handleTimeInput}
								disabled = {!this.state.day || !this.state.selectedCourt}
							>
								{this.getValidTimes()}
							</Select>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default CourtRegStep2
