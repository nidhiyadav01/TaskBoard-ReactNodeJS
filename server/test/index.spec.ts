
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app, generateToken } from '../src/index'; // Adjust the import path based on your directory structure
import User from '../src/models/User';
chai.use(chaiHttp);
const expect = chai.expect;

describe('API Tests', () => {
  it('should respond with "hello world" from /hello endpoint', async () => {
    const response = await chai.request(app).get('/hello');
    expect(response).to.have.status(200);
    expect(response.text).to.equal('hello world');
  });

  it('should fetch tasks from /tasks endpoint', async () => {
    // Generate a valid JWT token
    const user = { id: '64cbebf6d077b87fa9e5bc3f' }
    const token=generateToken(user.id);
    
    const response = await chai
      .request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`); // Attach the token to the request

    expect(response).to.have.status(200);
   
  });
  
  it('should create a new task', async () => {
    const user = { id: '64cbebf6d077b87fa9e5bc3f' };
    const token = generateToken(user.id);

    const taskData = { title: 'New Task' };

    const response = await chai
      .request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(taskData);

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('_id');
    expect(response.body.title).to.equal(taskData.title);

    
  });

  
  it('should sign up a new user', async () => {
    const userData = {
      username: 'testu',
      email: 'test@exam.com',
      password: 'testpassw',
    };

    const response = await chai.request(app).post('/').send(userData);

    expect(response).to.have.status(201);
    expect(response.body).to.have.property('message', 'Signup successful');

    // Verify the user was saved in the database
    const savedUser = await User.findOne({ email: userData.email });
    expect(savedUser).to.exist;
    expect(savedUser!.username).to.equal(userData.username);
  });
  
  it('should not sign up a user with an existing email', async () => {
    const existingUser = {
      username: 'existingu',
      email: 'existiexample.com',
      password: 'existingpassw',
    };

    // Create an existing user before the test
    await User.create(existingUser);

    const response = await chai.request(app).post('/').send(existingUser);

    expect(response).to.have.status(409);
    expect(response.body).to.have.property('message', 'User already exists');
  });
 
});
