export type TTask={
    title:string;
    _id:string;
  };


import axios from 'axios';

export async function getTasks(page: number,pageSize:number): Promise<{ tasks: TTask[]; totalPages: number }> {
 
  try {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      // Handle the case where the token is not present (user not authenticated)
      // For example, you can redirect the user back to the login page.
      const loginUrl = `/login?message=${encodeURIComponent('Please log in first')}`;
      window.location.href = loginUrl;
      return { tasks: [], totalPages: 0 };
    }

    const response = await axios.get<{ tasks: TTask[]; totalPages: number }>(
      `http://localhost:5000/tasks?page=${page}&pageSize=${pageSize}`, // Include the page parameter in the URL
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching tasks', error);
    // Handle the error appropriately
    throw new Error('Failed to fetch tasks. Please try again later.');
  }
}
