import axios, { AxiosResponse } from 'axios';

interface SignupResponse {
  message: string;
}

export async function signup(username: string, email: string, password: string): Promise<void> {
  try {
    const response: AxiosResponse<SignupResponse> = await axios.post("http://localhost:5000/", { username, email, password });
    console.log('Signup successful', response.data.message);
  } catch (error) {
    throw error;
  }
}