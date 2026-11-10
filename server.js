import express from "express";
import studentRoutes from './routes/students.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(logger);
app.use('/api/students', studentRoutes);
app.get('/', (req, res) => {
    res.status(200).json({
        message: "student management api is running"
    });
});
 app.use(errorHandler);
app.listen(PORT, () =>{
    console.log(`server is running on ${PORT}`);
});