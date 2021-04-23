import React, {Component} from 'react';
import {Form, Segment, Button, Message} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import Select from 'react-select';

class StudentForm extends Component {
    
	constructor(props) {
        super(props);
        this.state = {
            student: {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                hidden: true,
                loading: false,
                degree: '',
                yearOfDegree: '',
                interests: '',
                errorHeading: 'Error',
                errorMessage: 'Unknown error. Please try again!',
            },
			current_interests: [],
			displayed_interests: [],
            degreeOptions: [
                {value: 'degree1', label: 'Degree1'},
                {value: 'degree2', label: 'Degree2'},
                {value: 'degree3', label: 'Degree3'},
                {value: 'degree4', label: 'Degree4'},
                {value: 'degree5', label: 'Degree5'},
                {value: 'degree6', label: 'Degree6'},
                {value: 'degree7', label: 'Degree7'},
            ],

            degreeYearOptions: [
                {value: '1', label: '1'},
                {value: '2', label: '2'},
                {value: '3', label: '3'},
                {value: '4', label: '4'},
                {value: '5', label: '5'},
            ],

            interestOptions: [
                {value: 'interest1', label: 'Interest1'},
                {value: 'interest2', label: 'Interest2'},
                {value: 'interest3', label: 'Interest3'},
                {value: 'interest4', label: 'Interest4'},
                {value: 'interest5', label: 'Interest5'},
                {value: 'interest6', label: 'Interest6'},
                {value: 'interest7', label: 'Interest7'},
                {value: 'interest8', label: 'Interest8'},
            ],
        };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    handleSelectInputChange = async (event, select) => {
       
        let name = select.name;
		if (name === 'interests') {

			// Get array of objects 
			let value_array = await event;

			// Reduce to array of interests
			let filtered_interests = []
			let displayed_interests = []
			value_array.forEach((elem) => {
				filtered_interests.push(elem.value)
				displayed_interests.push(elem)
			});

			
			if (filtered_interests.length < 4) {
				this.setState({ current_interests: filtered_interests });			
				this.setState({ displayed_interests: value_array })
			}
		
		} else {
			let value = event.value;
			this.setState(
				(prevState) => ({student: {...prevState.student, [name]: value}}),
				() => console.log(this.state.student)
			);
		}


    }

    onSubmit = (event) => {
        console.log('FOOK');
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
                        value={this.state.name}
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
                        value={this.state.name}
                        onChange={this.handleInputChange}
                    />
                    <Form.Input
                        type='email'
                        name='email'
                        required
                        fluid
                        icon='mail'
                        iconPosition='left'
                        placeholder='Email'
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />
                    <Form.Input
                        type='password'
                        name='password'
                        required
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        minLength='6'
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                    <Select
                        type='degree'
                        name='degree'
                        required
                        options={this.state.degreeOptions}
                        defaultValue={this.state.student.degree}
                        placeholder={'Select Degree'}
						onChange={this.handleSelectInputChange}
                    />
                    <Select
                        type='yearOfDegree'
                        name='yearofdegree'
                        required
                        options={this.state.degreeYearOptions}
                        defaultValue={this.state.student.yearOfDegree}
                        placeholder={'Select Year Of Study'}
                        onChange={this.handleSelectInputChange}
                    />
                    <Select
                        type='interests'
                        name='interests'
                        required
                        options={this.state.interestOptions}
                        defaultValue={this.state.student.interests}
                        isMulti
                        placeholder={'Select Interests...'}
						value={this.state.displayed_interests}
                        onChange={this.handleSelectInputChange}
                    />
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
                <br />
                Have an Account? <Link to='/login'>Login</Link>
                <br />
            </Segment>
        );
    }
}

export default StudentForm;
