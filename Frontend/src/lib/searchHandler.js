const JsSearch = require('js-search');

class SearchHandler {

    constructor(subjects) {
        this.subjects = subjects;
    }

    searchAllSubjects(key) {
        var search = new JsSearch.Search('course_name');
        if (isNaN(key)) {
            search.addIndex('faculty');
            search.addIndex('description');
        } else {
            search.addIndex('_id');
        }

        Object.keys(this.subjects).forEach(elem => {
            search.addDocument(this.subjects[elem]);
        });

        return search.search(key)

    }
    
}

export default SearchHandler;
