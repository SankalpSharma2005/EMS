import express from 'express'
import cors from 'cors'
import connectToDatabase from './db/db.js'
import authRouter from "./routes/auth.js";
import employeeRouter from './routes/employee.js';
import healthRouter from "./routes/health.js";
//console.log("Auth routes loaded");
//console.log(authRouter);

connectToDatabase()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('public/uploads'))
app.use('/api/auth', authRouter)
app.use('/api/employee', employeeRouter)
app.use("/api/health", healthRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port ${process.env.PORT}`);
})