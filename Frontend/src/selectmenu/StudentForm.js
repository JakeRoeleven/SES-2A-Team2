import React, {Component} from 'react';  

import CheckBox from '../selectmenu/components/Checkbox';  
import Input from '../selectmenu/components/Input';  
import Select from '../selectmenu/components/Select';
import Button from '../selectmenu/components/Button'

class StudentForm extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      newStudent: {
        name: '',
        age: '',
        year: '',
        interests: [],

      },

      yearOptions: ['1','2','3','4','4'],
      interestOptions: ['Interest1', 'Interest2', 'Interest3', 'Interest4']

    }
    this.handleAge = this.handleAge.bind(this);
    this.handleFullName = this.handleFullName.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  
  handleFullName(e) {
   let value = e.target.value;
   this.setState( prevState => ({ newStudent : 
        {...prevState.newStudent, name: value
        }
      }), () => console.log(this.state.newStudent))
  }

  handleAge(e) {
       let value = e.target.value;
   this.setState( prevState => ({ newStudent : 
        {...prevState.newStudent, age: value
        }
      }), () => console.log(this.state.newStudent))
  }

  handleInput(e) {
       let value = e.target.value;
       let name = e.target.name;
   this.setState( prevState => ({ newStudent : 
        {...prevState.newStudent, [name]: value
        }
      }), () => console.log(this.state.newStudent))
  }

  handleCheckBox(e) {

    const newSelection = e.target.value;
    let newSelectionArray;

    if(this.state.newStudent.interests.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.newStudent.interests.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...this.state.newStudent.interests, newSelection];
    }

      this.setState( prevState => ({ newStudent:
        {...prevState.newStudent, interests: newSelectionArray }
      })
      )
}

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newStudent;

    fetch('http://example.com',{
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data =>{
          console.log("Successful" + data);
        })
    })
  }   
  handleClearForm(e) {
  
      e.preventDefault();
      this.setState({ 
        newStudent: {
          name: '',
          age: '',
          year: '',
          interests: [],
          about: ''
        },
      })
  }

  render() {
    return (
    
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>
       
            <Input inputType={'text'}
                   title= {'Full Name'} 
                   name= {'name'}
                   value={this.state.newStudent.name} 
                   placeholder = {'Enter your name'}
                   handleChange = {this.handleInput}
                   
                   /> {/* Name of the user */}
        
          <Input inputType={'number'} 
                name={'age'}
                 title= {'Age'} 
                 value={this.state.newStudent.age} 
                placeholder = {'Enter your age'}
                 handleChange={this.handleAge} /> {/* Age */} 


          <Select title={'Year'}
                  name={'year'}
                  options = {this.state.yearOptions} 
                  value = {this.state.newStudent.year}
                  placeholder = {'Select Year'}
                  handleChange = {this.handleInput}
                  /> {/* Age Selection */}
          <CheckBox  title={'Interests'}
                  name={'interests'}
                  options={this.state.interestOptions}
                  selectedOptions = { this.state.newStudent.interests}
                  handleChange={this.handleCheckBox}
                   /> {/* Skill */}

          <Button 
              action = {this.handleFormSubmit}
              type = {'primary'} 
              title = {'Submit'} 
            style={buttonStyle}
          /> { /*Submit */ }
          
          <Button 
            action = {this.handleClearForm}
            type = {'secondary'}
            title = {'Clear'}
            style={buttonStyle}
          /> {/* Clear the form */}
          
        </form>
  
    );
  }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}

export default StudentForm;