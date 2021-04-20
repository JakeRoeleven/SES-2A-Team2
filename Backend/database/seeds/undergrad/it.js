const request = require('request-promise');
const cheerio = require('cheerio'); 
var random_name = require('random-name');
var uniqid = require('uniqid');
const fs = require('fs');
const StudentService = require('../../../lib/studentService');
const mongoose = require('mongoose');

async function scrapeElectives(url) {
    let electives = [];
    await request(url, function (error, response, body) {
        const $ = cheerio.load(body);
        $('a').map((i,elm) => {
    
            let candidate = $(elm).text();
    
            if (!isNaN(candidate) && candidate.length > 3 && candidate.length < 7) {
                electives.push(candidate);
            }
        })
    });
    return electives;
}

async function buildStudents(year_level, degree_name, interests_input, major_list, electives_list) {

    const student_name = random_name.first() + " " + random_name.last()
    const major = "Information Technology"
    const degree = degree_name;
    const postgraduate = false;
    const interests = interests_input;

    let electives_completed = 4 * year_level;
    let core_completed = 4 * year_level;

    let electivesCandidates = [];
    let coreCandidates = [];

    // Now a list of core subjects
    for (const url of major_list) {
        let array_temp = await scrapeElectives(url);
        coreCandidates = coreCandidates.concat(array_temp);
    }

    // Now a list of electives
    for (const url of electives_list) {
        let array_temp = await scrapeElectives(url)
        electivesCandidates = electivesCandidates.concat(array_temp);
    }

    // Remove duplicates
    electivesCandidates = electivesCandidates.filter( function( item, index, inputArray ) {
        return inputArray.indexOf(item) == index;
    });

    coreCandidates = coreCandidates.filter( function( item, index, inputArray ) {
        return inputArray.indexOf(item) == index;
    });

    // Define Student Interests
    let interests_array = []
    while (interests_array.length < 3) {
        let random_number = Math.floor(Math.random() * (interests.length));
        if (!interests_array.includes(interests[random_number])) {
            interests_array.push(interests[random_number]);
        }
    }

    // Define Core Subjects 
    let core_subjects_completed_array = []
    if (core_completed > coreCandidates.length) core_completed = coreCandidates.length
    while (core_subjects_completed_array.length < core_completed) {
        let random_number = Math.floor(Math.random() * (coreCandidates.length));
        if (!core_subjects_completed_array.includes(coreCandidates[random_number])) {
            core_subjects_completed_array.push(coreCandidates[random_number].toString());
        }
    }

    // Define Student Electives 
    let electives_subjects_completed_array = []
    if (electives_completed >= electivesCandidates.length) electives_completed = electivesCandidates.length
    while (electives_subjects_completed_array.length < electives_completed) {
        let random_number = Math.floor(Math.random() * (electivesCandidates.length))
        if (!electives_subjects_completed_array.includes(electivesCandidates[random_number])) {
            electives_subjects_completed_array.push(electivesCandidates[random_number]);
        }
    }

    return({
        name: student_name,
        major: major,
        degree: degree,
        year: year_level,
        postgraduate: postgraduate,
        interests: interests_array,
        courses_completed: core_subjects_completed_array.concat(electives_subjects_completed_array),
    });

}

async function BachelorOfComputerScience(num_of_students) {

    // const all_interests = ['Programming', 'Maths', 'Statistics', 'Hospitality', 'Fitness', 'Language', 'Art', 'Humanities',
    // 'Architecture', 'History', 'Geography', 'Business', 'Economics', 'Education', 'Health', 'Engineering', 'Law', 'Computing',
    // 'Physics', 'Chemistry', 'Biology', 'Electronics', 'Medicine', 'Data Analytics', 'Mechanics']

    const CommSciCore = ['https://handbook.uts.edu.au/directory/stm91173.html']
    

    const artificialInterests = ['Maths', 'Programming', 'Statistics', 'Computing'];
    const artificialElectives = ['https://handbook.uts.edu.au/directory/maj10053.html'];

    const businessInterests = ['Maths', 'Business', 'Statistics', 'Computing'];
    const businessElectives = ['https://handbook.uts.edu.au/directory/maj02080.html'];

    const secInterests = ['Maths', 'Business', 'Statistics', 'Computing'];
    const secElectives = ['https://handbook.uts.edu.au/directory/maj02900.html'];

    const entInterests = ['Maths', 'Business', 'Statistics', 'Computing', 'Programming'];
    const entElectives = ['https://handbook.uts.edu.au/directory/maj03519.html'];

    const intDesInterests = ['Maths', 'Business', 'Statistics', 'Computing', 'Programming'];
    const intDesElectives = ['https://handbook.uts.edu.au/directory/maj02092.html'];

    const mathInterests = ['Maths', 'Statistics', 'Physics'];
    const mathElectives = ['https://handbook.uts.edu.au/directory/maj01156.html'];

    const netInterests = ['Business', 'Statistics', 'Computing', 'Programming'];
    const netElectives = ['https://handbook.uts.edu.au/directory/maj03445.html'];

    const opsInterests = ['Business', 'Statistics', 'Computing', 'Programming', 'Economics'];
    const opsElectives = ['https://handbook.uts.edu.au/directory/maj01157.html']

    const quantInterests = ['Maths', 'Statistics', 'Computing', 'Programming', 'Physics'];
    const quantElectives = ['https://handbook.uts.edu.au/directory/maj02901.html']

    //Sample Build List of Students
    let students_json = {};
    let studentService = new StudentService();

    console.time("all")
    // console.time("loop")
    for (let i = 0; i < (num_of_students/9); i++) {   
        console.log(i)   
        let year = Math.floor(Math.random() * 4) 
        if (year === 0) year = 1;
        studentService.setStudent(uniqid(), await buildStudents(year, 'Bachelor of Computer Science (Artificial Intelligence and Data Analytics)',  artificialInterests, CommSciCore , artificialElectives))
        studentService.setStudent(uniqid(), await buildStudents(year, 'Bachelor of Computer Science (Business Information Systems Management)',  businessInterests, CommSciCore , businessElectives))
        studentService.setStudent(uniqid(), await buildStudents(year, 'Bachelor of Computer Science (Cybersecurity and Privacy)',  secInterests, CommSciCore , secElectives))
        studentService.setStudent(uniqid(), await buildStudents(year, 'Bachelor of Computer Science (Enterprise Systems Development)',  entInterests, CommSciCore , entElectives))
        studentService.setStudent(uniqid(), await buildStudents(year, 'Bachelor of Computer Science (Interaction Design)',  intDesInterests, CommSciCore , intDesElectives))
        studentService.setStudent(uniqid(), await buildStudents(year, 'Bachelor of Computer Science (Mathematical Analysis)',  mathInterests, CommSciCore , mathElectives))
        studentService.setStudent(uniqid(), await buildStudents(year, 'Bachelor of Computer Science (Networking and Cybersecurity)',  netInterests, CommSciCore , netElectives))
        studentService.setStudent(uniqid(), await buildStudents(year, 'Bachelor of Computer Science (Operations Research)',  opsInterests, CommSciCore , opsElectives))
        studentService.setStudent(uniqid(), await buildStudents(year, 'Bachelor of Computer Science (Quantum Information Science)',  quantInterests, CommSciCore , quantElectives))
    }
    // console.timeEnd("loop")
    console.timeEnd("write")
    console.timeEnd("all")

}

async function BachelorOfInformationTechnology(num_of_students) {

    // const all_interests = ['Programming', 'Maths', 'Statistics', 'Hospitality', 'Fitness', 'Language', 'Art', 'Humanities',
    // 'Architecture', 'History', 'Geography', 'Business', 'Economics', 'Education', 'Health', 'Engineering', 'Law', 'Computing',
    // 'Physics', 'Chemistry', 'Biology', 'Electronics', 'Medicine', 'Data Analytics', 'Mechanics']

    const ITInterests = ['Computing', 'Data Analytics', 'Programming', 'Maths', 'Business']
    const ITCore = ['https://handbook.uts.edu.au/courses/c10143.html']
    const ITElectives = ['https://handbook.uts.edu.au/directory/smj03036.html', 'https://handbook.uts.edu.au/directory/smj02064.html', 'https://handbook.uts.edu.au/directory/smj02065.html', 'https://handbook.uts.edu.au/directory/smj02067.html', 'https://handbook.uts.edu.au/directory/smj10051.html', 'https://handbook.uts.edu.au/directory/smj03037.html']

    //Sample Build List of Students
    let students_json = {};
    let studentService = new StudentService();

    for (let i = 0; i < (num_of_students); i++) {   
        console.log(i)   
        let year = Math.floor(Math.random() * 4) 
        if (year === 0) year = 1;
        studentService.setStudent(uniqid(), await buildStudents(year, 'Bachelor of Information Technology', ITInterests, ITCore, ITElectives))
    }

}

async function BachelorOfScienceInGamesDevelopment(num_of_students) {

    // const all_interests = ['Programming', 'Maths', 'Statistics', 'Hospitality', 'Fitness', 'Language', 'Art', 'Humanities',
    // 'Architecture', 'History', 'Geography', 'Business', 'Economics', 'Education', 'Health', 'Engineering', 'Law', 'Computing',
    // 'Physics', 'Chemistry', 'Biology', 'Electronics', 'Medicine', 'Data Analytics', 'Mechanics', 'Games']

    const Interests = ['Computing', 'Programming', 'Games']
    const Core = ['https://handbook.uts.edu.au/courses/c10229.html#F5']
    const Electives = ['https://handbook.uts.edu.au/directory/smj08188.html', 'https://handbook.uts.edu.au/directory/smj10156.html', 'https://handbook.uts.edu.au/directory/smj02067.html', 'https://handbook.uts.edu.au/directory/smj10051.html']

    //Sample Build List of Students
    let students_json = {};
    let studentService = new StudentService();
    // console.time("loop")
    for (let i = 0; i < (num_of_students); i++) {   
        console.log(i)   
        let year = Math.floor(Math.random() * 4) 
        if (year === 0) year = 1;
        studentService.setStudent(uniqid(), await buildStudents(year, 'Bachelor Of Science In Games Development', Interests, Core, Electives))
    }
    // console.timeEnd("loop")
   
}

async function BachelorOfInformationSystems(num_of_students) {

    // const all_interests = ['Programming', 'Maths', 'Statistics', 'Hospitality', 'Fitness', 'Language', 'Art', 'Humanities',
    // 'Architecture', 'History', 'Geography', 'Business', 'Economics', 'Education', 'Health', 'Engineering', 'Law', 'Computing',
    // 'Physics', 'Chemistry', 'Biology', 'Electronics', 'Medicine', 'Data Analytics', 'Mechanics', 'Games']

    const Interests = ['Computing', 'Programming', 'Business', 'Statistics']
    const Core = ['https://handbook.uts.edu.au/courses/c10395.html']
    const Electives = ['https://handbook.uts.edu.au/directory/cbk91820.html', 'https://handbook.uts.edu.au/directory/cbk91821.html']

    //Sample Build List of Students
    let students_json = {};
    let studentService = new StudentService();

    // console.time("loop")
    for (let i = 0; i < (num_of_students); i++) {   
        console.log(i)   
        let year = Math.floor(Math.random() * 4) 
        if (year === 0) year = 1;
        studentService.setStudent(uniqid(), await buildStudents(year, 'Bachelor of Information Systems', Interests, Core, Electives))
    }
    // console.timeEnd("loop")

}


mongoose.connect('mongodb://root:password@165.232.165.231:27017', {useNewUrlParser: true, useUnifiedTopology: true, 
    useCreateIndex: true, useFindAndModify: false}).then(() => console.log("Successfully connected to the database"))
    .catch(error => console.log("Failed to connect to database: ", error));

BachelorOfComputerScience(500);
// BachelorOfInformationTechnology(150)
// BachelorOfScienceInGamesDevelopment(250)
// BachelorOfInformationSystems(150)