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
    const major = "Engineering"
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

async function BachelorOfEngineering(num_of_students) {

    // const all_interests = ['Programming', 'Maths', 'Statistics', 'Hospitality', 'Fitness', 'Language', 'Art', 'Humanities',
    // 'Architecture', 'History', 'Geography', 'Business', 'Economics', 'Education', 'Health', 'Engineering', 'Law', 'Computing',
    // 'Physics', 'Chemistry', 'Biology', 'Electronics', 'Medicine', 'Data Analytics', 'Mechanics']

    const biomedicalInterests = ['Maths', 'Engineering', 'Chemistry', 'Biology', 'Medicine'];
    const biomedicalElectives = ['https://handbook.uts.edu.au/directory/stm91230.html', 'https://handbook.uts.edu.au/directory/stm91229.html', 'https://handbook.uts.edu.au/directory/stm91229.html'];
    const biomedicalCore = ['https://handbook.uts.edu.au/directory/maj03472.html', 'https://handbook.uts.edu.au/directory/stm90106.html']
    
    const civilInterests = ['Maths', 'Statistics', 'Engineering', 'Physics', 'Architecture', 'Computing'];
    const civilElectives = ['https://handbook.uts.edu.au/directory/stm90494.html', 'https://handbook.uts.edu.au/directory/stm90496.html', 'https://handbook.uts.edu.au/directory/stm90493.html'];
    const civilCore = ['https://handbook.uts.edu.au/directory/stm90106.html', 'https://handbook.uts.edu.au/directory/maj03001.html']
    
    const electricalInterests = ['Maths', 'Statistics', 'Engineering', 'Physics', 'Computing', 'Electronics'];
    const electricalElectives = ['https://handbook.uts.edu.au/directory/cbk91782.html', 'https://handbook.uts.edu.au/directory/cbk91781.html'];
    const electricalCore = ['https://handbook.uts.edu.au/directory/stm90106.html', 'https://handbook.uts.edu.au/directory/maj03005.html'];

    const softwareInterests = ['Programming', 'Maths', 'Engineering', 'Computing'];
    const softwareElectives = ['https://handbook.uts.edu.au/directory/cbk91234.html', 'https://handbook.uts.edu.au/directory/smj02066.html', 'https://handbook.uts.edu.au/directory/smj03067.html', 'https://handbook.uts.edu.au/directory/smj10088.html', 'https://handbook.uts.edu.au/directory/smj10157.html','https://handbook.uts.edu.au/directory/smj03068.html', 'https://handbook.uts.edu.au/directory/smj02067.html']
    const softwareCore = ['https://handbook.uts.edu.au/directory/stm90106.html', 'https://handbook.uts.edu.au/directory/maj03523.html']
  
    const electronicsInterests = ['Maths', 'Statistics', 'Engineering', 'Physics', 'Computing', 'Electronics'];
    const electronicsElectives = ['https://handbook.uts.edu.au/directory/cbk91741.html', 'https://handbook.uts.edu.au/directory/smj10090.html'];
    const electronicsCore = ['https://handbook.uts.edu.au/directory/stm90106.html', 'https://handbook.uts.edu.au/directory/maj03527.html']

    const dataInterests = ['Maths', 'Programming', 'Statistics', 'Engineering', 'Computing', 'Data Analytics'];
    const dataElectives = ['https://handbook.uts.edu.au/directory/cbk91233.html', 'https://handbook.uts.edu.au/directory/smj03062.html', 'https://handbook.uts.edu.au/directory/smj03066.html', 'https://handbook.uts.edu.au/directory/cbk91231.html'];
    const dataCore = ['https://handbook.uts.edu.au/directory/stm90106.html', 'https://handbook.uts.edu.au/directory/maj03518.html']

    const mechanicalInterests = ['Maths', 'Physics', 'Statistics', 'Engineering', 'Computing', 'Chemistry', 'Mechanics']
    const mechanicalElectives = ['https://handbook.uts.edu.au/directory/cbk90976.html', 'https://handbook.uts.edu.au/directory/stm90675.html']
    const mechanicalCore = ['https://handbook.uts.edu.au/directory/stm90106.html', 'https://handbook.uts.edu.au/directory/maj03007.html']

    const mechatronicsInterests = ['Maths', 'Physics', 'Statistics', 'Engineering', 'Computing', 'Chemistry', 'Programming'];
    const mechatronicsElectives = ['https://handbook.uts.edu.au/directory/stm90675.html', 'https://handbook.uts.edu.au/directory/smj03050.html'];
    const mechatronicsCore = ['https://handbook.uts.edu.au/directory/stm90106.html', 'https://handbook.uts.edu.au/directory/maj03507.html']

    const flexibleInterests = ['Maths', 'Physics', 'Statistics', 'Engineering', 'Computing', 'Chemistry', 'Programming', 'Architecture'];
    const flexibleElectives = ['https://handbook.uts.edu.au/directory/cbk91969.html', 'https://handbook.uts.edu.au/directory/cbk91970.html'];
    const flexibleCore = ['https://handbook.uts.edu.au/directory/stm90106.html', 'https://handbook.uts.edu.au/directory/maj03540.html']


    //Sample Build List of Students
    let students_json = {};
    let studentService = new StudentService();

    console.time("all")
    // console.time("loop")
    for (let i = 0; i < (num_of_students/9); i++) {   
        console.log(i)   
        let year = Math.floor(Math.random() * 4) 
        if (year === 0) year = 1;
        studentService.setStudent(uniqid(), await buildStudents(year, 'Bachelor of Flexible Engineering', flexibleInterests, flexibleCore, flexibleElectives))
        studentService.setStudent(uniqid(), await buildStudents(year, 'Bachelor of Mechatronics Engineering', mechatronicsInterests, mechatronicsCore, mechatronicsElectives))
        studentService.setStudent(uniqid(),  await buildStudents(year, 'Bachelor of Mechanical Engineering', mechanicalInterests, mechanicalCore, mechanicalElectives))
        studentService.setStudent(uniqid(), await buildStudents(year, 'Bachelor of Data Engineering', dataInterests, dataCore, dataElectives))
        studentService.setStudent(uniqid(),  await buildStudents(year, 'Bachelor of Electronic Engineering', electronicsInterests, electronicsCore, electronicsElectives))
        studentService.setStudent(uniqid(),  await buildStudents(year, 'Bachelor of Software Engineering', softwareInterests, softwareCore, softwareElectives))
        studentService.setStudent(uniqid(),  await buildStudents(year, 'Bachelor of Electrical Engineering', electricalInterests, electricalCore, electricalElectives))
        studentService.setStudent(uniqid(),  await buildStudents(year, 'Bachelor of Civil Engineering', civilInterests, civilCore, civilElectives))
        studentService.setStudent(uniqid(),  await buildStudents(year, 'Bachelor of Biomedical Engineering', biomedicalInterests, biomedicalCore, biomedicalElectives))
    }
    // console.timeEnd("loop")
   
    console.time("write")
    fs.writeFileSync('engineering-students.json', JSON.stringify(students_json));
    console.timeEnd("write")
    console.timeEnd("all")

}

mongoose.connect('mongodb://root:password@165.232.165.231:27017', {useNewUrlParser: true, useUnifiedTopology: true, 
    useCreateIndex: true, useFindAndModify: false}).then(() => console.log("Successfully connected to the database"))
    .catch(error => console.log("Failed to connect to database: ", error));
BachelorOfEngineering(990);