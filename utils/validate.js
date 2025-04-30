export default function validate(editedtask){
  if(!editedtask.description){
    return { error: true, message: 'Description is required' };
  }

  if(editedtask.subTasks.length){
    console.log('subtask' , editedtask.subTasks);
    const invalidSubTask = editedtask.subTasks.find(subTask => !subTask.description.trim());
    console.log(invalidSubTask);
    if(invalidSubTask){
      return { error: true, message: 'Sub-task description is required' };
    }
  }
  return { error: false };
}