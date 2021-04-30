import React, {Component} from 'react';
import {Form, Segment} from 'semantic-ui-react';
import {Button, TextField, Container, Grid, Typography} from '@material-ui/core';
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
];

class StudentForm extends Component {
    // TODO: Postgrad, DEgree Name, Redirect if already have details, for validation

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            major: '',
            degree: '',
            yearOfDegree: '',
            current_interests: [],
            displayed_interests: [],
        };
    }

    handleInputChange = (event) => {
        const {value, name} = event.target;
        this.setState({[name]: value});
    };

    handleSelectInputChange = async (event, select) => {
        let name = select.name;
        let value = event.value;
        this.setState({[name]: value});
    };

    setCurrentInterests = (value) => {
        this.setState({current_interests: value});
    };

    setMajor = (value) => {
        this.setState({major: value});
    };

    setDisplayedInterests = (value) => {
        this.setState({displayed_interests: value});
    };

    getStudentData = () => {
       
        let student = {};
        let id = sessionStorage.getItem('user_id');

        // Push id from firebase
        student['id'] = id;

        student['student_data'] = {};
        student['student_data']['name'] = this.state.firstname.concat(' ').concat(this.state.lastname);

        //TODO: Need degree
        student['student_data']['degree'] = this.state.degree;
        student['student_data']['major'] = this.state.major;
        student['student_data']['year'] = this.state.yearOfDegree;
        student['student_data']['postgraduate'] = false;
        student['student_data']['interests'] = this.state.current_interests;

        return student;
    };

    onSubmit = async (event) => {
        let student = this.getStudentData();
        this.setState({loading: true});
        event.preventDefault();
        fetch('http://localhost:8080/api/new-student', {
            method: 'POST',
            body: JSON.stringify(student),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async (res) => {
                if (res.status === 200) {
                    this.props.history.push('/recommendations');
                } else {
                    const error = JSON.parse(await res.json());
                    alert(error);
                }
            })
            .catch((err) => {
                alert(err);
            });
    };

    render() {
        return (
            <Segment color='blue' padded textAlign='center'>
                <br />
                {/* <Message
                    hidden={this.state.hidden}
                    error
                    header={this.state.errorHeading}
                    content={this.state.errorMessage}
                /> */}
                <Container maxWidth={false}>
                    <Grid container spacing={0}>
                        <Grid item xs={8}>
                            <Typography variant='h5'> Setup Your Account To Begin </Typography>
                        </Grid>
                    </Grid>
                    <Form size='large' onSubmit={this.onSubmit}>

                        <br />
                        <TextField name='firstname' required minLength='3' maxLength='20' fluid icon='user' iconPosition='left' placeholder='First Name' value={this.state.firstname} onChange={this.handleInputChange} />
                        <TextField name='lastname' required minLength='3' maxLength='20' fluid icon='user' iconPosition='left' placeholder='Last Name' value={this.state.lastname} onChange={this.handleInputChange} />

                        <br /><br />
                        <TextField name='degree' required minLength='3' maxLength='200' fluid icon='paper' iconPosition='left' placeholder='Degree' value={this.state.degree} onChange={this.handleInputChange} />

                        <br /><br />
                        <Select type='yearOfDegree' name='yearOfDegree' required options={degreeYearOptions} defaultValue={this.state.yearOfDegree} placeholder={'Select Year Of Study'} onChange={this.handleSelectInputChange} />
                        
                        <br />
                        <MajorSelect setMajor={this.setMajor} />
                        
                        <br />
                        <InterestSelect displayed_interests={this.state.displayed_interests} setCurrentInterests={this.setCurrentInterests} setDisplayedInterests={this.setDisplayedInterests} />
                        
                        <br />
                        <Button loading={this.state.loading} type='submit' value='Submit' color='blue' fluid size='large' style={{float: 'right'}}>
                            Create Account
                        </Button>
                    </Form>
                </Container>
            </Segment>
        );
    }
}

export default StudentForm;
