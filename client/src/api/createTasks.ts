export async function createTasks(title:string){
    const response=await fetch("http://localhost:5000/tasks",{
        method:"POST",
        body:JSON.stringify({
          title,
        }),
        headers:{
          "Content-Type":"application/json",
        },
      });
      return response.json();
}