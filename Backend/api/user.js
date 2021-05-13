const express = require('express');
const router = express.Router();
const StudentService = require('../lib/studentService');
const AdminService = require('../lib/adminService');

router.get('/user/:id', async (req, res) => {
    
    let id = req.params.id;

    const adminService = new AdminService();
    let isAdmin = await adminService.isAdmin(id)

    let responseObj = {
        'accountType': 'student',
        'userDetails': {},
        'signupComplete': false
    }
    
    if (isAdmin) {
        responseObj.accountType = 'admin';
    } else {
        const studentService = new StudentService();
        responseObj.userDetails = await studentService.getStudent(id);
        responseObj.signupComplete = await studentService.signupComplete(id);
    }
   
    res.status(200).json(responseObj);

});

module.exports = router;
