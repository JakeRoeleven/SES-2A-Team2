import React, {useState, useEffect, useContext} from 'react';
import Chip from '@material-ui/core/Chip';
import { AppContext } from '../AppContext';

function CoursesCompleted(props) {

		const data = useContext(AppContext);

		const [courses, setCourses] = useState([]);
		const [subjects, setSubjects] = useState({});

		const deleteSubject = (subject_code) => {
			
			// Delete subject from array
			const index = courses.indexOf(subject_code);
			let new_courses = courses
			if (courses.length == 1) {
				new_courses = []
			} else if (index > -1) {
				new_courses = courses.splice(index, 1);
			}

			// Make the student object
			let student = {}
			student['id'] = props.student._id;
			student["student_data"] = {}
			student["student_data"]['name'] = props.student.name;
			student["student_data"]['degree'] = props.student.degree;
			student["student_data"]['major'] = props.student.major;
			student["student_data"]['year'] = props.student.year;
			student["student_data"]['postgraduate'] = props.student.postgraduate;
			student["student_data"]['interests'] = props.student.interests;
			student["student_data"]['courses_completed'] = new_courses;

			console.log(student)

			fetch('http://localhost:8080/api/update-student', {
				method: 'POST',
				body: JSON.stringify(student),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(async (res) => {
					if (res.status === 200) {
						alert("Details updated")
						setCourses(new_courses)
					} else {
						const error = JSON.parse(await res.json());
						alert(error)
					}
				})
				.catch(err => {
					alert(err)
			});

		}

		const findSubjects = () => {
			setCourses(props.courses)
			let subject_obj = {};
			data.forEach(elem => {
				if (courses.includes(elem._id)) {
						subject_obj[elem._id] = elem
				}
			})
			setSubjects(subject_obj);
		}

		useEffect(() => {
			debugger;
			findSubjects()
		}, [findSubjects, setCourses, setSubjects]);

		debugger;
		if (courses.length > 0 && Object.keys(subjects).length > 0) {
			console.log('hi')
			console.log(courses)
			return (
				Object.keys(courses).map((index) => (
						<Chip label={courses[index] + " - " + subjects[courses[index]]['course_name']}  onDelete={() => deleteSubject(courses[index])} color="primary" style={{ marginRight: '0.5%' }} />
				))
			);
		} else {
			return (
				<p>No Courses Completed...</p>
			)
		}
 
}

export default CoursesCompleted;
