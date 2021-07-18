import React, { Component } from 'react'
import NavBar from './components/Navbar'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound'
import Activities from './components/Activities'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CourtRegMaster from './components/courtReg/CourtRegMaster'
import CourseRegMaster from './components/courseReg/CourseRegMaster'
import CourtRegConfirmation from './components/courtReg/CourtRegConfirmation'
import CourseRegConfirmation from './components/courseReg/CourseRegConfirmation'
import FindOthers from './components/findOthers/FindOthers'
import { withTranslation } from 'react-i18next'
import AboutUs from './components/AboutUs'


class App extends Component {
	state = {
		lang: "en",
		courts: [
			{
				id: 1,
				type: 'hard court',
				bookings: [
					{
						time: '13:00',
						day: new Date(),
					},
					{
						time: '12:00',
						day: new Date(),
					},
					{
						time: '14:00',
						day: new Date(),
					},
					{
						time: '15:00',
						day: new Date(),
					},
					{
						time: '16:00',
						day: new Date(),
					},
					{
						time: '17:00',
						day: new Date(),
					},
				],
			},
			{
				id: 2,
				type: 'soft clay court',
				bookings: [
					{
						time: '15:00',
						day: new Date(),
					},
				],
			},
		],

		courses: {
			beginner: [
				{
					id: 1,
					name: 'Tennis 101',
					days: [2, 4],
					time: '13:00',
					instructor: 'Tim',
				},
				{
					id: 2,
					name: 'Serving for beginners',
					days: [1, 5],
					time: '14:00',
					instructor: 'Tim',
				},
				{
					id: 3,
					name: 'Learn to Rally!',
					days: [3],
					time: '15:00',
					instructor: 'Tim',
				},
			],
			intermediate: [
				{
					id: 4,
					name: 'Tennis Strategies',
					days: [1],
					time: '13:30',
					instructor: 'Tim',
				},
				{
					id: 5,
					name: 'Intermediate Group Lessons',
					days: [3, 5],
					time: '12:00',
					instructor: 'Tim',
				},
			],
			advanced: [
				{
					id: 6,
					name: 'Doubles Strategies',
					days: [4],
					time: '17:00',
					instructor: 'Tim',
				},
				{
					id: 5,
					name: 'Advanced Group Lessons',
					days: [3],
					time: '14:00',
					instructor: 'Tim',
				},
			],
		},
		lfg: [
			{
				name: 'Sein',
				experience: 'Beginner',
				about: "I'm looking for a doubles partner to learn with :)",
			},
		],

		lfm: [
			{
				names: 'Sein, Joey',
				lookingFor: '2',
				about: "We're a doubles team looking for another team to play with",
			},
		],
	}

	addCourtBooking = (courtId, day, time) => {
		const court = this.state.courts.filter((court) => court.id == courtId)[0]

		court.bookings.push({
			day: day,
			time: time,
		})
	}

	addToLFG = (name, experience, about) => {
		let lfg = [
			...this.state.lfg,
			{
				name: name,
				experience: experience,
				about: about,
			},
		]
		this.setState({
			lfg: lfg,
		})
	}

	addToLFM = (names, lookingFor, about) => {
		let lfm = [
			...this.state.lfm,
			{
				names: names,
				lookingFor: lookingFor,
				about: about,
			},
		]
		this.setState({
			lfm: lfm,
		})
	}

	changeLanguage = (lang) => {
		this.setState({lang: lang})
		this.props.i18n.changeLanguage(lang)
	} 

	render() {

		const { t } = this.props
		return (
			<div className="App">
					<Router>
						<NavBar changeLanguage={this.changeLanguage} currentLang={this.state.lang} />
						<Switch>
							<Route path="/" exact component={Home}></Route>
							<Route path="/activities" exact>
									<Activities
										courseInfo={this.state.courses}
										courts={this.state.courts}
										t = {t}
										changeLanguage = {this.changeLanguage}
										lang = {this.state.lang}
									/>
							</Route>
							<Route path="/courtReg" exact>
								<CourtRegMaster
									courts={this.state.courts}
									addCourtBooking={this.addCourtBooking}
								/>
							</Route>
							<Route path="/courseReg" exact>
								<CourseRegMaster courseInfo={this.state.courses} />
							</Route>
							<Route path="/lfg" exact>
								<FindOthers
									lfg={this.state.lfg}
									lfm={this.state.lfm}
									addLFG={this.addToLFG}
									addLFM={this.addToLFM}
								/>
							</Route>
							<Route path="/courtReg/confirmation" exact>
								<CourtRegConfirmation />
							</Route>
							<Route path="/courseReg/confirmation" exact>
								<CourseRegConfirmation />
							</Route>
							<Route path="/about" exact>
								<AboutUs />
							</Route>
							<Route exact>
								<PageNotFound />
							</Route>
						</Switch>
					</Router>
			</div>
		)
	}
}

export default withTranslation('common')(App)
