import students from "../data/students.js"
export const getAllStudents = (req, res) => {
    res.status(200).json(students);
};
export const getStudentById = (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
        message: "Invalid student ID"
        });
    }
    const student = students.find(s =>s.id === id);
    if(!student){
        return res.status(404).json({
            message: "student not found"
        });
    }
    res.status(200).json(student)
};
export const createStudent = (req, res) => {
    const { name, email, age, course, gpa, status } = req.body;
    const newStudent = {
        id: students.length > 0
            ? Math.max(...students.map(s => s.id)) + 1
            : 1,
        name,
        email,
        age,
        course,
        gpa,
        status
    };
    students.push(newStudent);
    res.status(201).json({
        message: "student created successfully",
        student: newStudent
    });
};
export const updateStudent = (req, res) => {
    const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid student ID"
        });
    }
    const student = students.find(s =>s.id === id)
    if(!student){
        return res.status(404).json({
            message: "student not found"
        });
    }
    const { name, email, age, course, gpa, status} = req.body;
    student.name = name;
    student.email = email;
    student.age = age;
    student.course = course;
    student.gpa = gpa;
    student.status = status;

    res.status(200).json({
        message: "student updated successfully",
        student
    });
};
export const patchStudent = (req, res) => {
    const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid student ID"
        });
    }
    const student = students.find(s => s.id === id);
    if (!student){
        return res.status(404).json({
            message: "student not found"
        });
    }
    const allowedFields = ['name', 'email', 'age', 'course', 'gpa', 'status'];
    const updates = {};
    for(const field of allowedFields){
        if(req.body[field] !== undefined){
            updates[field] = req.body[field];
        }
    }
    Object.assign(student, updates);
    res.status(200).json({
        message: "student partially updated successfully",
        student
    });
};

export const deleteStudent = (req, res) => {
    const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid student ID"
        });
    }
    const studentIndex = students.findIndex(s => s.id === id);
    if(studentIndex === -1){
        return res.status(404).json({
            message: "student not found"
        });
    }
    const deletedStudent = students.splice(studentIndex, 1);
    res.status(200).json({
        message: "student deleted successfully",
        student: deletedStudent[0]
    });
};
export const searchStudents = (req, res) => {
    const {name, email, course, status, gpa } = req.query;
    let result = [...students];
    if(name){
        result = result.filter(s =>s.name.toLowerCase().includes(name.toLowerCase()));
    }
    if(email){
        result = result.filter(s => s.email.toLowerCase().includes(email.toLowerCase()));
    }
    if(course){
        result = result.filter(s => s.course.toLowerCase().includes(course.toLowerCase()));
    }
    if(status){
        result = result.filter(s => s.status.toLowerCase() === status.toLowerCase());
    }
    if(gpa !== undefined){
        result = result.filter(s => s.gpa === Number(gpa));
    }
    res.status(200).json(result);
}
export const getStudentStats = (req,res) => {
    const totalStudents = students.length;
    const totalGpa = students.reduce((total, student) => total + student.gpa, 0);
    const averageGpa = totalStudents > 0? Number((totalGpa / totalStudents).toFixed(2)): 0;
    const studentsByCourse = students.reduce((result,student) => {
        result[student.course] = (result[student.course] || 0) + 1;
        return result
    },{});

    res.status(200).json({
            totalStudents,
            averageGpa,
            studentsByCourse
        });
};