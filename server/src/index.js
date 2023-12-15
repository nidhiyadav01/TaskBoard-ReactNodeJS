"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.app = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const cors_1 = __importDefault(require("cors"));
const Task_1 = __importDefault(require("./models/Task"));
const cookieParser = require("cookie-parser");
const { authenticateToken } = require("./auth");
const jwt = require('jsonwebtoken');
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./models/User"));
(0, dotenv_1.config)();
const PORT = 5000;
const secret = 'mysecretsshhh';
//const app = express();
exports.app = (0, express_1.default)();
exports.app.get('/hello', (req, res) => {
    res.send("hello world");
});
exports.app.use((0, cors_1.default)({
    origin: "*",
}));
exports.app.use(express_1.default.json());
exports.app.get('/tasks', authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const pageNumber = parseInt(page || '1', 10);
    const itemsPerPage = parseInt(pageSize || '10', 10);
    try {
        const totalCount = yield Task_1.default.countDocuments();
        const tasks = yield Task_1.default.find()
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage)
            .exec();
        res.json({ tasks, totalPages: Math.ceil(totalCount / itemsPerPage) });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.app.post("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    const newTask = new Task_1.default({
        title: req.body.title,
    });
    const createdTask = yield newTask.save();
    res.json(createdTask);
}));
exports.app.delete("/tasks/:taskId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.taskId;
    const task = yield Task_1.default.findByIdAndDelete(taskId);
    res.json(task);
}));
exports.app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        // Create a new user
        const newUser = new User_1.default({ username, email, password });
        yield newUser.save();
        res.status(201).json({ message: 'Signup successful' });
    }
    catch (error) {
        console.error('Signup failed', error);
        res.status(500).json({ message: 'Signup failed' });
    }
}));
function generateToken(userId) {
    const token = jwt.sign({ userId }, 'your-secret-key', {
        expiresIn: '1h', // You can adjust the token expiration as needed
    });
    return token;
}
exports.generateToken = generateToken;
exports.app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Find the user with the provided email
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Compare the provided password with the user's password
        const isPasswordValid = yield user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = generateToken(user.id);
        // Return the token in the response
        res.status(200).json({ token });
        // Return a success response if login is successful
        // res.status(200).json({ message: 'Login successful' });
        // res.status(200).json({ message: 'Login successful', accessToken });
    }
    catch (error) {
        console.error('Login failed', error);
        res.status(500).json({ message: 'Login failed' });
    }
}));
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose_1.default
    .connect(process.env.MONGO_URL, mongoOptions)
    .then(() => {
    console.log(`Listening on port ${PORT}`);
    exports.app.listen(PORT);
})
    .catch((error) => {
    console.error('Database connection error', error);
});
