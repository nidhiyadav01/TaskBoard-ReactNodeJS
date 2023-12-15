export async function deleteTask(taskId:string){
    await fetch(`http://localhost:5000/tasks/${taskId}`,{
        method:"DELETE",
        
      });
}