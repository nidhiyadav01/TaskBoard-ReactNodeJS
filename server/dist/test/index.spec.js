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
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const index_1 = require("../src/index"); // Adjust the import path based on your directory structure
chai_1.default.use(chai_http_1.default);
const expect = chai_1.default.expect;
describe('API Tests', () => {
    it('should respond with "hello world" from /hello endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield chai_1.default.request(index_1.app).get('/hello');
        expect(response).to.have.status(200);
        expect(response.text).to.equal('hello world');
    }));
    it('should fetch tasks from /tasks endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        // Generate a valid JWT token
        const user = { id: '64cbebf6d077b87fa9e5bc3f' };
        const token = (0, index_1.generateToken)(user.id);
        const response = yield chai_1.default
            .request(index_1.app)
            .get('/tasks')
            .set('Authorization', `Bearer ${token}`); // Attach the token to the request
        expect(response).to.have.status(200);
    }));
    it('should create a new task', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { id: '64cbebf6d077b87fa9e5bc3f' };
        const token = (0, index_1.generateToken)(user.id);
        const taskData = { title: 'New Task' };
        const response = yield chai_1.default
            .request(index_1.app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send(taskData);
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('_id');
        expect(response.body.title).to.equal(taskData.title);
        // Optionally, you can assert other properties of the response if needed
    }));
    it('should not create a new task without authentication', () => __awaiter(void 0, void 0, void 0, function* () {
        const taskData = { title: 'New Task' };
        const response = yield chai_1.default
            .request(index_1.app)
            .post('/tasks')
            .send(taskData);
        expect(response).to.have.status(401);
        expect(response.body).to.have.property('message', 'Unauthorized');
    }));
    it('should not create a new task without a title', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { id: '64cbebf6d077b87fa9e5bc3f' };
        const token = (0, index_1.generateToken)(user.id);
        const response = yield chai_1.default
            .request(index_1.app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({}); // Sending an empty object
        expect(response).to.have.status(400);
        expect(response.body).to.have.property('error', 'Title is required');
    }));
});
