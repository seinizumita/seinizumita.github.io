import React, { Component } from 'react'
import M from 'materialize-css'
import {
	Collapsible,
	CollapsibleItem,
	Select,
	Table,
	Modal,
	Button,
} from 'react-materialize'
import 'jquery'

class FindOthers extends Component {

    state = {
        lfgName: null,
        lfgExperience: null,
        lfgAbout: null,
        lfmNames: null,
        lfmLookingFor: null,
        lfmAbout: null
    }


    handleExperienceSelect = (e) => {
        this.setState({
            lfgExperience: e.target.value
        })
    }
    
    handlePeopleSelect = (e) => {
        this.setState({
            lfmLookingFor: e.target.value 
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

	submitLFG = (e) => {
        e.preventDefault();
        this.props.addLFG(this.state.lfgName, this.state.lfgExperience, this.state.lfgAbout);
        document.getElementById('LFG').reset();
        M.toast({html: 'Success! Your post has been added!'})
    }

    submitLFM = (e) => {
        e.preventDefault()
        this.props.addLFM(this.state.lfmNames, this.state.lfmLookingFor, this.state.lfmAbout)
        document.getElementById('LFM').reset();
        M.toast({html: 'Success! Your post has been added!'})
    }

	sendMessage = (e) => {
		M.toast({ html: 'Success! Your message has been sent!' })
	}

	render() {
        const lfgPosts = this.props.lfg
		const lfmPosts = this.props.lfm
		return (
			<div className="container">
				<h4 className="center">Find Others</h4>
				<h5 className="vertical-align center mt-150">I am...</h5>
				<div className="row">
					<div className="col s6 left-col">
						<Collapsible accordion className="center">
							<CollapsibleItem expanded={false} header="Looking for Group" className="bold">
								<span>
									Alone and in need of someone to play with? Submit a looking
									for group post to find a partner!
								</span>
								<br></br>
								<div className="row">
									<form id="LFG" onSubmit={this.submitLFG}>
										<div className="col s12">
											<div className="input-field col s12">
												<label for="lfgName">
													Name
												</label>
												<input
													id="lfgName"
													type="text"
													class="validate"
                                                    onChange={this.handleChange}
												/>
											</div>
											<Select
												id="lfgSelect"
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
                                                onChange = {this.handleExperienceSelect}
											>
												<option disabled value="0">
													Select your level of experience
												</option>
												<option value="beginner">Beginner</option>
												<option value="intermediate">Intermediate</option>
												<option value="advanced">Advanced</option>
											</Select>
											<div className="input-field col s12">
												<label className="active" for="lfgAbout">
													About you
												</label>
												<input
													id="lfgAbout"
													type="text"
													class="validate"
                                                    onChange={this.handleChange}
												/>
											</div>
											<button
												class="btn waves-effect waves-light green darken-3"
												name="action"
											>
												Submit
												<i class="material-icons right">send</i>
											</button>
										</div>
									</form>
								</div>
							</CollapsibleItem>
						</Collapsible>
					</div>
					<div className="col s6 left-col">
						<Collapsible accordion className="center">
							<CollapsibleItem expanded={false} header="Looking for More" className="bold">
								<span>
									Are you a group who needs 1 more to round out the game?
									Doubles partners looking for more players? Submit a looking
									for more post to find the remaining players in your group
								</span>
								<br></br>
								<div className="row">
									<form id="LFM" onSubmit={this.submitLFM}>
										<div className="col s12">
											<div className="input-field col s12">
												<label for="lfmNames">
													Names
												</label>
												<input
													id="lfmNames"
													type="text"
													class="validate"
                                                    onChange={this.handleChange}
												/>
											</div>
											<Select
												id="lfmSelect"
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
                                                onChange = {this.handlePeopleSelect}
												value="0"
											>
												<option disabled value="0">
													How many people are you looking for?
												</option>
												<option value="1">1</option>
												<option value="2">2</option>
											</Select>
											<div className="input-field col s12">
												<label for="lfmAbout">
													Notes
												</label>
												<input
													id="lfmAbout"
													type="text"
													class="validate"
                                                    onChange={this.handleChange}
												/>
											</div>
                                            <button
												class="btn waves-effect waves-light green darken-3"
												name="action"
											>
												Submit
												<i class="material-icons right">send</i>
											</button>
										</div>
									</form>
								</div>
							</CollapsibleItem>
						</Collapsible>
					</div>
				</div>
				<div className="row">
					<div className="s6 col left-col">
						<h4 className="center"> LFG Posts</h4>
						<Table>
							<thead>
								<tr>
									<th data-field="name">Name</th>
									<th data-field="experience">Experience</th>
									<th data-field="About">About</th>
									<th data-field="msg"></th>
								</tr>
							</thead>
							<tbody>
                                {lfgPosts.map((post, i) => {
                                    return (
                                        <tr key={i}>
                                        <td>{post.name}</td>
                                        <td>{post.experience}</td>
                                        <td>{post.about}</td>
                                        <td>
										<Modal
											actions={[
												<Button
													flat
													modal="close"
													node="button"
													onClick={this.sendMessage}
												>
													Send
												</Button>,
												<Button flat modal="close" node="button">
													Close
												</Button>,
											]}
											bottomSheet={false}
											fixedFooter={false}
											header="Send a message!"
											id="Modal-0"
											open={false}
											options={{
												dismissible: true,
												endingTop: '10%',
												inDuration: 250,
												onCloseEnd: null,
												onCloseStart: null,
												onOpenEnd: null,
												onOpenStart: null,
												opacity: 0.5,
												outDuration: 250,
												preventScrolling: true,
												startingTop: '4%',
											}}
											trigger={
												<button
													className="btn green darken-3 white-text"
													node="button"
												>
													Message
												</button>
											}
										>
											<div class="row">
												<form class="col s12">
													<div class="row">
														<div class="input-field col s12">
															<textarea
																id="textarea1"
																class="materialize-textarea"
																defaultValue="Hello! I saw your LFG post and was wondering if you would like to play together!"
															></textarea>
														</div>
													</div>
												</form>
											</div>
										</Modal>
									</td>
                                    </tr>
                                    )
                                })}
							</tbody>
						</Table>
					</div>
                    <div className="s6 col left-col">
						<h4 className="center"> LFM Posts</h4>
						<Table>
							<thead>
								<tr>
									<th data-field="name">Names</th>
									<th data-field="experience">Need</th>
									<th data-field="About">About</th>
									<th data-field="msg"></th>
								</tr>
							</thead>
							<tbody>
                                {lfmPosts.map((post, i) => {
                                    return (
                                        <tr key={i}>
                                        <td>{post.names}</td>
                                        <td>{post.lookingFor} more</td>
                                        <td>{post.about}</td>
                                        <td>
										<Modal
											actions={[
												<Button
													flat
													modal="close"
													node="button"
													onClick={this.sendMessage}
												>
													Send
												</Button>,
												<Button flat modal="close" node="button">
													Close
												</Button>,
											]}
											bottomSheet={false}
											fixedFooter={false}
											header="Send a message!"
											id="Modal-0"
											open={false}
											options={{
												dismissible: true,
												endingTop: '10%',
												inDuration: 250,
												onCloseEnd: null,
												onCloseStart: null,
												onOpenEnd: null,
												onOpenStart: null,
												opacity: 0.5,
												outDuration: 250,
												preventScrolling: true,
												startingTop: '4%',
											}}
											trigger={
												<button
													className="btn green darken-3 white-text"
													node="button"
												>
													Message
												</button>
											}
										>
											<div class="row">
												<form class="col s12">
													<div class="row">
														<div class="input-field col s12">
															<textarea
																id="textarea1"
																class="materialize-textarea"
																defaultValue="Hello! I saw your LFM post and was wondering if you would like to play together!"
															></textarea>
														</div>
													</div>
												</form>
											</div>
										</Modal>
									</td>
                                    </tr>
                                    )
                                })}
							</tbody>
						</Table>
					</div>
				</div>
			</div>
		)
	}
}

export default FindOthers
