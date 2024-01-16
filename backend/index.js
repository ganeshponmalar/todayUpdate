import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './Routes/user.route.js';
import authRouter from './Routes/auth.router.js';

const url = 'mongodb://localhost:27017/Estate';
const port = 8000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(url, { useUnifiedTopology: true }); // Remove { useNewUrlParser: true }
const con = mongoose.connection;

con.on('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

app.use((err,req,res,next)=>{

const statusCode = err.statusCode || 500;
const message = err.message || 'Internal Server Error';
return res.status(statusCode).json({
    success:false,
    statusCode,
    message
});
})

