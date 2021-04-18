

module.exports.getAllInterests = () => {
    const all_interests = ['Programming', 'Maths', 'Statistics', 'Hospitality', 'Fitness', 'Language', 'Art', 'Humanities',
    'Architecture', 'History', 'Geography', 'Business', 'Economics', 'Education', 'Health', 'Engineering', 'Law', 'Computing',
    'Physics', 'Chemistry', 'Biology', 'Electronics', 'Medicine', 'Data Analytics', 'Mechanics']

    return all_interests;
};

module.exports.interestsToJSON = () => {
    const interests = getAllInterests();
    const interests_json = {};
    interests.forEach(element => {
        interests_json[element] = false;
    });
    return interests_json;
};

module.exports.setInterestInJSON = () => (interests) => {
    const interests_json = interestsToJSON();
    interests.forEach(element => {
        interests_json[element] = true;
    });
    return interests_json;
};

module.exports.interestsJSONToArray = () => (interests_json) => {
    console.log(test)
    let all_interests = getAllInterests();
    let interest_array = [];
    all_interests.forEach(interest => {
        if (interests_json[interest]) interest_array.push(true)
        interest_array.push(false)
    });
    return interest_array
};

