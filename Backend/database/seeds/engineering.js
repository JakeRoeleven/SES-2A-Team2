const request = require('request-promise');
const cheerio = require('cheerio'); 
var random_name = require('random-name');

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

async function buildStudents(year_level, degree_name, interests_input, major_url, electives_list) {

    let electives_completed = 3 * year_level;
    let core_engineering_completed = 2 * year_level;
    let core_major_completed = 3 * year_level;
    
    const student_name = random_name.first() + " " + random_name.last()
    const major = "Engineering"
    const degree = degree_name;
    const postgraduate = false;
    const interests = interests_input;
    const coreEngineeringSubjects = await scrapeElectives('https://handbook.uts.edu.au/directory/stm91173.html')
    const coreMajorSubjects = await scrapeElectives(major_url);
    const courseElectives = [];
    
    // Now a list of electives
    for (const url of electives_list) {
        let array_temp = await scrapeElectives(url);
        courseElectives.concat(array_temp);
    }

    // Define Student Interests
    let interests_array = []
    while (interests_array.length < 3) {
        let random_number = Math.floor(Math.random() * (interests.length));
        if (!interests_array.includes(interests[random_number])) {
            interests_array.push(interests[random_number]);
        }
    }

    // Define Core Subjects 
    let core_major_subjects_array = []
    while (core_major_subjects_array.length < core_major_completed) {
        let random_number = Math.floor(Math.random() * (coreMajorSubjects.length));
        if (!core_major_subjects_array.includes(coreMajorSubjects[random_number])) {
            core_major_subjects_array.push(coreMajorSubjects[random_number].toString());
        }
    }

    // Define Core Subjects 
    let core_subjects_array = []
    while (core_subjects_array.length < core_engineering_completed) {
        let random_number = Math.floor(Math.random() * (coreEngineeringSubjects.length));
        if (!core_subjects_array.includes(coreEngineeringSubjects[random_number])) {
            core_subjects_array.push(coreEngineeringSubjects[random_number].toString());
        }
    }

    // Define Student Electives 
    let electives_array = []
    if (electives_completed > courseElectives.length) electives_completed = courseElectives.length

    while (electives_array.length < electives_completed) {
        let random_number = Math.floor(Math.random() * (courseElectives.length))
        if (!electives_array.includes(courseElectives[random_number])) {
            electives_array.push(courseElectives[random_number].toString());
        }
    }

    return({
        name: student_name,
        year: year_level,
        major: major,
        degree: degree,
        postgraduate: postgraduate,
        interests: interests_array,
        courses_completed: core_subjects_array.concat(core_major_subjects_array).concat(electives_array),
    });

}

async function main() {

    // const all_interests = ['Programming', 'Maths', 'Statistics', 'Hospitality', 'Fitness', 'Language', 'Art', 'Humanities',
    // 'Architecture', 'History', 'Geography', 'Business', 'Economics', 'Education', 'Health', 'Engineering', 'Law', 'Computing',
    // 'Physics', 'Chemistry', 'Biology']
    console.time('random')
    const biomedicalInterests = ['Maths', 'Statistics', 'Engineering', 'Physics', 'Chemistry', 'Biology'];
    const biomedicalElectives = ['https://handbook.uts.edu.au/directory/stm91230.html', 'https://handbook.uts.edu.au/directory/stm91229.html', 'https://handbook.uts.edu.au/directory/stm91229.html'];
    console.log(await buildStudents(1, 'Bachelor of Biomedical Engineering', biomedicalInterests, 'https://handbook.uts.edu.au/directory/maj03472.html', biomedicalElectives))

    const civilInterests = ['Maths', 'Statistics', 'Engineering', 'Physics', 'Architecture', 'Computing'];
    const civilElectives = ['https://handbook.uts.edu.au/directory/stm90494.html', 'https://handbook.uts.edu.au/directory/stm90496.html', 'https://handbook.uts.edu.au/directory/stm90493.html'];
    console.log(await buildStudents(1, 'Bachelor of Civil Engineering', civilInterests, 'https://handbook.uts.edu.au/directory/maj03001.html', civilElectives))

    const electricalInterests = ['Maths', 'Statistics', 'Engineering', 'Physics', 'Architecture', 'Computing'];
    const electricalElectives = ['https://handbook.uts.edu.au/directory/cbk91782.html'];
    console.log(await buildStudents(1, 'Bachelor of Electrical Engineering', electricalInterests, 'https://handbook.uts.edu.au/directory/maj03005.html', electricalElectives))

    const softwareInterests = ['Programming', 'Maths', 'Statistics', 'Engineering', 'Computing'];
    const softwareElectives = ['https://handbook.uts.edu.au/directory/cbk91234.html'];
    console.log(await buildStudents(1, 'Bachelor of Software Engineering', softwareInterests, 'https://handbook.uts.edu.au/directory/maj03523.html', softwareElectives))

    const electronicsInterests = ['Maths', 'Statistics', 'Engineering', 'Physics', 'Computing'];
    const electronicsElectives = ['https://handbook.uts.edu.au/directory/cbk91741.html'];
    console.log(await buildStudents(1, 'Bachelor of Electronic Engineering', electronicsInterests, 'https://handbook.uts.edu.au/directory/maj03527.html', electronicsElectives))

    const dataInterests = ['Math', 'Programming', 'Statisstics', 'Engineeering', 'Computing'];
    const dataElectives = ['https://handbook.uts.edu.au/directory/cbk91233.html'];
    console.log(await buildStudents(1, 'Bachelor of Data Engineering', dataInterests, 'https://handbook.uts.edu.au/directory/maj03518.html', dataElectives))

    const mechanicalInterests = ['Math', 'Physics', 'Statistics', 'Engineering', 'Computing', 'Chemistry']
    const mechanicalElectives = ['https://handbook.uts.edu.au/directory/cbk90976.html', 'https://handbook.uts.edu.au/directory/stm90675.html']
    console.log(await buildStudents(1, 'Bachelor of Mechanical Engineering', mechanicalInterests, 'https://handbook.uts.edu.au/directory/maj03030.html', mechanicalElectives))

    const mechatronicsInterests = ['Math', 'Physics', 'Statistics', 'Engineering', 'Computing', 'Chemistry', 'Programming'];
    const mechatronicsElectives = ['https://handbook.uts.edu.au/directory/stm90675.html', 'https://handbook.uts.edu.au/directory/smj03050.html'];
    console.log(await buildStudents(1, 'Bachelor of Mechatronics Engineering', mechatronicsInterests, 'https://handbook.uts.edu.au/directory/maj03507.html', mechatronicsElectives))

    const flexibleInterests = ['Math', 'Physics', 'Statistics', 'Engineering', 'Computing', 'Chemistry', 'Programming', 'Architecture'];
    const flexibleElectives = ['https://handbook.uts.edu.au/directory/cbk91969.html', 'https://handbook.uts.edu.au/directory/cbk91970.html'];
    console.log(await buildStudents((Math.floor(Math.random() * 4) + 1), 'Bachelor of Flexible Engineering', flexibleInterests, 'https://handbook.uts.edu.au/directory/maj03540.html', flexibleElectives))

    //const civilEnvironmentalInterests = ['Maths', 'Statistics', 'Engineering', 'Physics', 'Architecture', 'Computing', 'Biology', 'Geography'];
    //const dataInterests = ['Programming', 'Maths', 'Statistics', 'Engineering', 'Computing'];
    console.timeEnd('random')
    // Sample Software Engineering Student
 
}

main()