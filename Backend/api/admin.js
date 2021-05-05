const express = require('express');
const router = express.Router();
const AdminService = require('../lib/adminService');

router.post('/set-admin', async (req, res) => {

    let id = req.body.id;
    let email = req.body.email;
    
    const adminService = new AdminService();
    try {
        let setAdmin = await adminService.setAdmin(id, email)
        res.status(200).json(setAdmin);
    } catch (e) {
        console.log(e)
        res.status(400);
    }

});

router.get('/admin/:id', async (req, res) => {

    let id = req.params.id;

    const adminService = new AdminService();
    try {
        let setAdmin = await adminService.isAdmin(id)
        res.status(200).json(setAdmin);
    } catch (e) {
        console.log(e)
        res.status(400);
    }
});

module.exports = router;
