import React, {Component} from 'react';
import {Form, Segment, Button, Message} from 'semantic-ui-react';
import Select from 'react-select';
import InterestSelect from '../components/InterestSelects';
import firebase from './../firebase';
import MajorSelect from '../components/MajorSelect';

const degreeYearOptions = [
	{value: '1', label: '1'},
	{value: '2', label: '2'},
	{value: '3', label: '3'},
	{value: '4', label: '4'},
	{value: '5', label: '5'},
	{value: '6', label: '6'},
]

class StudentForm extends Component {
    
	constructor(props) {
        super(props);
        this.state = {
			firstname: '',
			lastname: '',
			major: '',
			yearOfDegree: '',
			current_interests: [],
			displayed_interests: [],
        };
    }


    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    handleSelectInputChange = async (event, select) => {  	
        let name = select.name;
		let value = event.value;
		this.setState( { [name] : value } );
    }

	setCurrentInterests = (value) => {
		this.setState({ current_interests: value });			
	}

	setMajor = (value) => {
		this.setState({ major: value });			
	}

	setDisplayedInterests = (value) => {
		console.log(value)
		this.setState({ displayed_interests: value });			
	}

    onSubmit = async (event) => {

		let student = {}
		let firebaseDetails = await firebase.getCurrentUser()

		console.log(this.state)

		// Push id from firebase
		student['_id'] = firebaseDetails.l;
		student['email'] = firebaseDetails.email;

		student['name'] = this.state.firstname.concat(" ").concat(this.state.lastname)
		student['major'] = this.state.major;
		student['year'] = this.state.yearOfDegree;
		student['postgraduate'] = false;
		student['interests'] =this.state.current_interests;

		console.log(student)

        // this.setState({ loading: true });
        // event.preventDefault();
        // fetch('api/user/register', {
        // 	method: 'POST',
        // 	body: JSON.stringify(this.state),
        // 	headers: {
        // 		'Content-Type': 'application/json'
        // 	}
        // })
        // 	.then(async (res) => {
        // 		if (res.status === 200) {
        // 			this.setState({ hidden: true, loading: false });
        // 			this.props.history.push('/login');
        // 		} else {
        // 			const error = JSON.parse(await res.json());
        // 			this.setState({ hidden: false, loading: false, errorHeading: "Error!", errorMessage: error });
        // 		}
        // 	})
        // 	.catch(err => {
        // 		this.setState({ hidden: false, loading: false, errorHeading: "Error!", errorMessage: "Check you internet connection and try again!" });
        // 	})
    };

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
                    <Form.Input
                        name='firstname'
                        required
                        minLength='3'
                        maxLength='20'
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='First Name'
                        value={this.state.firstname}
                        onChange={this.handleInputChange}
                    />
                    <Form.Input
                        name='lastname'
                        required
                        minLength='3'
                        maxLength='20'
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='Lastname'
                        value={this.state.lastname}
                        onChange={this.handleInputChange}
                    />

                    <Select
                        type='yearOfDegree'
                        name='yearOfDegree'
                        required
                        options={degreeYearOptions}
                        defaultValue={this.state.yearOfDegree}
                        placeholder={'Select Year Of Study'}
                        onChange={this.handleSelectInputChange}
                    />
					<MajorSelect />
					<InterestSelect 
						displayed_interests={this.state.displayed_interests} 
						setCurrentInterests={this.setCurrentInterests} 
						setDisplayedInterests={this.setDisplayedInterests} />
                    <Button
                        loading={this.state.loading}
                        type='submit'
                        value='Submit'
                        color='blue'
                        fluid
                        size='large'
                    >
                        Create Account
                    </Button>
                </Form>
            </Segment>
        );
    }
}

export default StudentForm;
