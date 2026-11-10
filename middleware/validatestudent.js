
const validateStudent = (req, res, next) => {
    const body = req.body ?? {};

    // PATCH: validate only the fields provided
    if (req.method === 'PATCH') {
        const allowedFields = [
            'name', 'email', 'age', 'course', 'gpa', 'status'
        ];

        const fields = Object.keys(body);

        if (fields.length === 0) {
            return res.status(400).json({
                message: "Please provide at least one field to update"
            });
        }

        // Reject fields that are not allowed
        const invalidFields = fields.filter(
            field => !allowedFields.includes(field)
        );

        if (invalidFields.length > 0) {
            return res.status(400).json({
                message: "Invalid fields provided",
                invalidFields
            });
        }

        if (body.name !== undefined &&
            (typeof body.name !== 'string' || !body.name.trim())) {
            return res.status(400).json({
                message: "Name must be a non-empty string"
            });
        }

        if (body.email !== undefined &&
            (typeof body.email !== 'string' ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))) {
            return res.status(400).json({
                message: "Please provide a valid email address"
            });
        }

        if (body.age !== undefined &&
            (typeof body.age !== 'number' || body.age <= 0)) {
            return res.status(400).json({
                message: "Age must be a positive number"
            });
        }

        if (body.course !== undefined &&
            (typeof body.course !== 'string' || !body.course.trim())) {
            return res.status(400).json({
                message: "Course must be a non-empty string"
            });
        }

        if (body.gpa !== undefined &&
            (typeof body.gpa !== 'number' || body.gpa < 0 || body.gpa > 4)) {
            return res.status(400).json({
                message: "GPA must be a number between 0 and 4"
            });
        }

        if (body.status !== undefined &&
            !['Active', 'Inactive'].includes(body.status)) {
            return res.status(400).json({
                message: "Status must be Active or Inactive"
            });
        }

        return next();
    }

    // POST and PUT: all fields are required
    const { name, email, age, course, gpa, status } = body;

    if (!name || !email || !age || !course || gpa === undefined || !status) {
        return res.status(400).json({
            message: "All student fields are required"
        });
    }

    if (typeof age !== 'number' || age <= 0) {
        return res.status(400).json({
            message: "Age must be a positive number"
        });
    }

    if (typeof gpa !== 'number' || gpa < 0 || gpa > 4) {
        return res.status(400).json({
            message: "GPA must be a number between 0 and 4"
        });
    }

    if (typeof email !== 'string' ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)){
        return res.status(400).json({
            message: "Please provide a valid email address"
        });
    }

    if (!['Active', 'Inactive'].includes(status)) {
        return res.status(400).json({
            message: "Status must be Active or Inactive"
        });
    }

    if (typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({
            message: "Name must be a non-empty string"
        });
    }

    if (typeof course !== 'string' || !course.trim()) {
        return res.status(400).json({
            message: "Course must be a non-empty string"
        });
    }

    next();
};

export default validateStudent;
