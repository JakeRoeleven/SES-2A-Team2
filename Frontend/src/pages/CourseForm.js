import React, {Component} from 'react'; 
import { Form, Segment, Button, Message } from 'semantic-ui-react';
import Select from 'react-select';

class CourseForm extends Component {

	constructor(props) {
		super(props)
		this.state = {
			course:{
				name: '',
				creditPoints: '',
				postgraduate: '',
				prerequisites: '',
				antirequisites: '',
				errorHeading: 'Error',
				errorMessage: 'Unknown error. Please try again!'
			},
			requisteOptions:[
				{value: 'requiste1', label: 'Requiste1'},
				{value: 'requiste2', label: 'Requiste2'},
				{value: 'requiste3', label: 'Requiste3'},
				{value: 'requiste4', label: 'Requiste4'},
				{value: 'requiste5', label: 'Requiste5'},
				{value: 'requiste6', label: 'Requiste6'},
				{value: 'requiste7', label: 'Requiste7'}
			]
		}
	}

	handleInputChange = (event) => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

	handleInput(e) {
		let value = e.target.value;
		let name = e.target.name;
	this.setState( prevState => ({ course : 
		 {...prevState.course, [name]: value
		 }
	   }), () => console.log(this.state.course))
   }

	onSubmit = (event) => {
		this.setState({ loading: true });
		event.preventDefault();
		fetch('api/user/register', {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(async (res) => {
				if (res.status === 200) {
					this.setState({ hidden: true, loading: false });
				} else {
					const error = JSON.parse(await res.json());
					this.setState({ hidden: false, loading: false, errorHeading: "Error!", errorMessage: error });
				}
			})
			.catch(err => {
				this.setState({ hidden: false, loading: false, errorHeading: "Error!", errorMessage: "Check you internet connection and try again!" });
			})
	}

	render() {
		return (
			<Segment color='blue' padded textAlign='center'>
				<br />
				<Message
					hidden={this.state.hidden}
					error
					header={this.state.errorHeading}
					content={this.state.errorMessage}
				/>
				<Form size='large' onSubmit={this.onSubmit}>
				    <Form.Input name="coursename" required 
					            minLength='3' 
								maxLength='20'
								fluid icon='user' 
								iconPosition='left' 
								placeholder='Enter Course Name'
								value={this.state.name}
								onChange={this.handleInputChange} />
					<Form.Input name="creditpoints" required 
					            minLength='3' 
								maxLength='4'
								fluid icon='user' 
								iconPosition='left' 
								placeholder='Enter Credit Points'
								value={this.state.creditPoints}
								onChange={this.handleInputChange} />
					<Form.Input name="postgraduate" required 
					            minLength='3' 
								maxLength='4'
								fluid icon='user' 
								iconPosition='left' 
								placeholder='Postgraduate?'
								value={this.state.postgraduate}
								onChange={this.handleInputChange} />
					<Select type="prerequistes" 
					            name="degree" required
								options = {this.state.requisteOptions} 
								defaultValue = {this.state.course.prerequisites}
								placeholder = {'Select Pre-Requistes'}
								handleChange = {this.handleInput} />
					<Select type="antirequisites" 
					            name="degree" required
								options = {this.state.requisteOptions} 
								defaultValue = {this.state.course.antirequisites}
								placeholder = {'Select Anti-Requistes'}
								handleChange = {this.handleInput} />
					<Button loading={this.state.loading} type='submit' value="Submit" color='blue' fluid size='large'>Add Course</Button>
				</Form>
			</Segment>
		)
	}

};

export default CourseForm;