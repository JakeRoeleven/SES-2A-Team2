const JsSearch = require('js-search');

class SearchHandler {

    constructor(subjects) {
        this.subjects = subjects;
    }

    searchAllSubjects(key) {

        if (isNaN(key)) {
            var search = new JsSearch.Search('course_name');
            search.addIndex('faculty');
            search.addIndex('description');
        } else {
            var search = new JsSearch.Search('course_name');
            search.addIndex('_id');
        }

        Object.keys(this.subjects).forEach(elem => {
            search.addDocument(this.subjects[elem]);
        });

        return search.search(key)

    }
    
}

export default SearchHandler;
