import React, {Component} from 'react'; 
import { Form, Segment, Button, Message, Input, Checkbox } from 'semantic-ui-react';
import Select from 'react-select';

class Home extends Component {

	constructor(props) {
		super(props)
		this.state = {
			student:{
				firstname: '',
				lastname: '',
				email: '',
				degree: '',
				finishedCourses: '',
				posgraduate: [],
				interest: '',
				errorHeading: 'Error',
				errorMessage: 'Unknown error. Please try again!'
			},

			courseOptions: [
				{ value: 'course1', label: 'Course 1' },
				{ value: 'course2', label: 'Course 2' },
				{ value: 'course3', label: 'Course 3' },
				{ value: 'course4', label: 'Course 4' },
				{ value: 'course5', label: 'Course 5' },
				{ value: 'course6', label: 'Course 6' },
				{ value: 'course7', label: 'Course 7' },
				{ value: 'course8', label: 'Course 8' }
			],

			interestOptions: [
				{ value: 'interest1', label: 'Interest1' },
				{ value: 'interest2', label: 'Interest2' },
				{ value: 'interest3', label: 'Interest3' },
				{ value: 'interest4', label: 'Interest4' },
				{ value: 'interest5', label: 'Interest5' },
				{ value: 'interest6', label: 'Interest6' },
				{ value: 'interest7', label: 'Interest7' },
				{ value: 'interest8', label: 'Interest8' }
			]
		}
	}

	// input checlbox for postgraduate

	handleInputChange = (event) => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

	handleInput(e) {
		let value = e.target.value;
		let name = e.target.name;
	this.setState( prevState => ({ student : 
		 {...prevState.student, [name]: value
		 }
	   }), () => console.log(this.state.student))
    }

	handleCheckBox(e) {
		const newSelection = e.target.value;
		let newSelectionArray;
		
		if(this.state.newStudent.interests.indexOf(newSelection) > -1) {
			newSelectionArray = this.state.newStudent.interests.filter(s => s !== newSelection)
		} 
		
		else {
		  newSelectionArray = [...this.state.newStudent.interests, newSelection];
		}
		
		this.setState( prevState => ({ newStudent:
			{...prevState.newStudent, interests: newSelectionArray }
		}))
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
					this.props.history.push('/login');
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
			<Segment color='blue' padded textAlign='Left'>
				<br />
                <h1> Finish Your Profile to Get Started </h1>
				<Message
					hidden={this.state.hidden} 
					error header={this.state.errorHeading}
					content={this.state.errorMessage}
				/>
				<Form size='large' onSubmit={this.onSubmit}>
				    <Form.Field control={Input}
					            label='First Name'
					            name="firstname" required 
					            minLength='3' 
								maxLength='20'
								fluid icon='user' 
								iconPosition='left' 
								placeholder='First Name'
								value={this.state.name}
								onChange={this.handleInputChange} />
					<Form.Field control={Input}
					            label='Lastname'
					            name="lastname" required 
					            minLength='3' 
								maxLength='20'
								fluid icon='user' 
								iconPosition='left' 
								placeholder='Lastname'
								value={this.state.name}
								onChange={this.handleInputChange} />
					<Form.Field control={Input}
					            label='Enrolled Degree'
					            type="degree" 
					            name="degree" required
								placeholder= {'Select Degree'}
								value={this.state.degree} 
								onChange={this.handleInputChange} />
					<Form.Field control={Checkbox}
					            label= {'Postgraduate?'}
							    name="postgraduate" required
							    defaultValue = {this.state.student.postgraduate}
							    handleChange={this.handleCheckBox} />
					<Form.Field control={Select}
					            label='Finished Courses'
					            type="finishedCourses" 
					            name="finishedcourses" required
								fluid
								search
								selection
								options = {this.state.courseOptions} 
								defaultValue = {this.state.student.finishedCourses} isMulti
								placeholder = {'Select Courses'}
								handleChange = {this.handleInput} />
					<Form.Field control={Select}
					            label='Interests of Choice'
					            type="interest"
					            name="interest" required
								options = {this.state.interestOptions} 
								defaultValue = {this.state.student.interest} isMulti
								placeholder = {'Select Interest'}
								handleChange = {this.handleInput} />
					<Button loading={this.state.loading} type='submit' value="Submit" color='blue' fluid size='large'>View Recommendations</Button>
				</Form>
			</Segment>
		)
	}

};


export default Home;
