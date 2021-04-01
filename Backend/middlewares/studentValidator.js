const isValidStudent = function (req, res, next) {

    // TODO: check Students have name, id, status, degree, courses-completed (can be empty), interests (can be empty)

    console.log(req.body)
    next()
}

module.exports.isValidStudent = isValidStudent;