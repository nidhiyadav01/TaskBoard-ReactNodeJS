// import axios from 'axios';

// export async function login(email: string, password: string): Promise<void> {
//   try {
//     // Make a request to the server to authenticate the user
//      await axios.post('http://localhost:5000/login', { email, password });
     
    
//   } catch (error) {
//     // Handle the login error
//     throw new Error('Login failed. Please check your credentials and try again.');
//   }
// }

// import axios from 'axios';

// interface LoginResponse {
//   accessToken: string;
// }

// export async function login(email: string, password: string): Promise<LoginResponse> {
//   try {
//     // Make a request to the server to authenticate the user
//     const response = await axios.post<LoginResponse>('http://localhost:5000/login', { email, password });
//     return response.data;

//   } catch (error) {
//     // Handle the login error
//     throw new Error('Login failed. Please check your credentials and try again.');
//   }
// }

import axios from 'axios';

export async function login(email: string, password: string): Promise<string> {
  try {
    // Make a request to the server to authenticate the user
    const response = await axios.post('http://localhost:5000/login', { email, password });
    
    // Extract the token from the response data
    const token = response.data.token;
    
    return token;
  } catch (error) {
    // Handle the login error
    throw new Error('Login failed. Please check your credentials and try again.');
  }
}
