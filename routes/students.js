import express from "express";
import validateStudent from "../middleware/validatestudent.js";
import {getAllStudents,
        getStudentById,
        createStudent,
        updateStudent,
        patchStudent,
        deleteStudent,
        searchStudents,
        getStudentStats
} from "../controllers/studentController.js";

const router = express.Router();
router.get('/', getAllStudents);
router.get('/search', searchStudents)
router.get('/stats', getStudentStats);
router.get('/:id', getStudentById);
router.post('/', validateStudent, createStudent);
router.put('/:id', validateStudent, updateStudent);
router.patch('/:id', validateStudent, patchStudent);
router.delete('/:id', deleteStudent);

export default router;