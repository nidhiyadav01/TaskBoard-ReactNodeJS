import { config } from "dotenv";
config();


import cors from "cors";
import Task from "./models/Task";
const cookieParser = require("cookie-parser");
const { authenticateToken } = require("./auth");
const jwt = require('jsonwebtoken');
import express, { Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';

import User, { IUser } from './models/User';

config();
const PORT=5000;
const secret = 'mysecretsshhh';
//const app = express();
export const app = express();
app.get('/hello',(req,res)=>{
    res.send("hello world");
});

app.use(cors({
    origin:"*",
}));
app.use(express.json());



app.get('/tasks', authenticateToken, async (req: Request, res: Response) => {
  const page = req.query.page as string | undefined;
  const pageSize = req.query.pageSize as string | undefined;

  const pageNumber = parseInt(page || '1', 10);
  const itemsPerPage = parseInt(pageSize || '10', 10);

  try {
    const totalCount = await Task.countDocuments();
    const tasks = await Task.find()
      .skip((pageNumber - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .exec();

    res.json({ tasks, totalPages: Math.ceil(totalCount / itemsPerPage) });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.post("/tasks",async (req,res) => {
    console.log (req);
    const newTask=new Task({
        title:req.body.title,
    });
const createdTask=await newTask.save();
res.json(createdTask);
});


app.delete("/tasks/:taskId",async (req,res)=>{
    const taskId=req.params.taskId;
    const task =await Task.findByIdAndDelete(taskId);
    res.json(task);
});


app.post('/', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      // Create a new user
      const newUser: IUser = new User({ username, email, password });
      await newUser.save();
      res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
      console.error('Signup failed', error);
      res.status(500).json({ message: 'Signup failed' });
    }
  });

 export function generateToken(userId: string): string {
  const token = jwt.sign({ userId }, 'your-secret-key', {
    expiresIn: '1h', // You can adjust the token expiration as needed
  });
  return token;
}

app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find the user with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    

    // Compare the provided password with the user's password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    
   const token=generateToken(user.id);

    // Return the token in the response
    res.status(200).json({  token });

      
    

    // Return a success response if login is successful
   // res.status(200).json({ message: 'Login successful' });
   // res.status(200).json({ message: 'Login successful', accessToken });
  } catch (error) {
    console.error('Login failed', error);
    res.status(500).json({ message: 'Login failed' });
  }
});



const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions;
  
  mongoose
    .connect(process.env.MONGO_URL!, mongoOptions)
    .then(() => {
      console.log(`Listening on port ${PORT}`);
      app.listen(PORT);
    })
    .catch((error) => {
      console.error('Database connection error', error);
    });