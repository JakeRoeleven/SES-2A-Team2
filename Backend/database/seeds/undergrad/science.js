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
    const major = "Science"
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

async function BachelorOfScience(num_of_students) {

    // const all_interests = ['Programming', 'Maths', 'Statistics', 'Hospitality', 'Fitness', 'Language', 'Art', 'Humanities',
    // 'Architecture', 'History', 'Geography', 'Business', 'Economics', 'Education', 'Health', 'Engineering', 'Law', 'Computing',
    // 'Physics', 'Chemistry', 'Biology', 'Electronics', 'Medicine', 'Data Analytics', 'Mechanics', 'Games', 'Marketing', 'Writing', 'Communications', 'Music']

    const chemInterests =  ['Chemistry', 'Maths', 'Statistics', 'Medicine', 'Data Analytics']
    const chemCore = ['https://handbook.uts.edu.au/directory/maj01100.html']
    const chemElectives = ['https://handbook.uts.edu.au/directory/smj02054.html', 'https://handbook.uts.edu.au/directory/smj01031.html']

    const physicsInterests =  ['Physics', 'Maths', 'Statistics', 'Medicine', 'Data Analytics']
    const physicsCore = ['https://handbook.uts.edu.au/directory/stm90683.html']
    const physicsElectives = ['https://handbook.uts.edu.au/directory/smj10030.html', 'https://handbook.uts.edu.au/directory/maj01101.html']

    const mathsInterests =  ['Maths', 'Statistics', 'Medicine', 'Data Analytics']
    const mathsCore = ['https://handbook.uts.edu.au/directory/maj01110.html']
    const mathsElectives = ['https://handbook.uts.edu.au/directory/stm90686.html']

    const bioInterests =  ['Biology', 'Statistics', 'Medicine', 'Data Analytics']
    const bioCore = ['https://handbook.uts.edu.au/directory/maj01103.html']
    const bioElectives = ['https://handbook.uts.edu.au/directory/stm91568.html']

    //Sample Build List of Students
    let students_json = {};
    let studentService = new StudentService();

    // console.time("loop")
    for (let i = 0; i < (num_of_students)/4; i++) {   
        console.log(i)   
        let year = Math.floor(Math.random() * 5) 
        if (year === 0) year = 1;
        studentService.setStudent(uniqid(), await buildStudents(year, 'Bachelor of Science (Chemistry)', chemInterests, chemCore, chemElectives))
        studentService.setStudent(uniqid(), await buildStudents(year, 'Bachelor of Science (Physics)', physicsInterests, physicsCore, physicsElectives))
        studentService.setStudent(uniqid(), await buildStudents(year, 'Bachelor of Science (Mathematics)', mathsInterests, mathsCore, mathsElectives))
        studentService.setStudent(uniqid(), await buildStudents(year, 'Bachelor of Science (Biology)', bioInterests, bioCore, bioElectives))
    }
    // console.timeEnd("loop")

}

mongoose.connect('mongodb://root:password@165.232.165.231:27017', {useNewUrlParser: true, useUnifiedTopology: true, 
    useCreateIndex: true, useFindAndModify: false}).then(() => console.log("Successfully connected to the database"))
    .catch(error => console.log("Failed to connect to database: ", error));

BachelorOfScience(1200);

// BachelorOfInformationTechnology(150)
// BachelorOfScienceInGamesDevelopment(250)
// BachelorOfInformationSystems(150)
