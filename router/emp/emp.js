import { Router } from 'express';
import checkAuth from '../../middleware/authHandler.js';
import studentController from '../../controller/emp/empController.js';

const router = new Router();

router.use(checkAuth);
router.route('/').get((req, res) => {
    return res.render('emp/home.ejs');
});

router.route('/addstudent/:id').post(studentController.addStudent);
router.route('/getstudent/:id').get(studentController.getStudent);
router.route('/addinterview/:id').post(studentController.addinterview);
router.route('/getinterview/:id').get(studentController.getInterview);
router.route('/updatestudent/:id').put(studentController.updateStudent);
router.route('/updateinterview/:id').post(studentController.updateInterview);
router.route('/result/:id').get(studentController.getResult);
router.route('/csv/:id').get(studentController.csvHandler);

export default router;