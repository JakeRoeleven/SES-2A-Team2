const Admin = require('../models/AdminModel');

class AdminService {

    constructor() {
    }

    async setAdmin(id, email) {

        const adminObject = new Admin({
            _id: id, 
            email: email
        });

        await adminObject.save();

    }

    async isAdmin(id) {
        let admin = await Admin.findOne({ _id: id }).lean();
        if (admin == null) {
            return false;
        } else {
            return true
        }

    }

}

module.exports = AdminService;