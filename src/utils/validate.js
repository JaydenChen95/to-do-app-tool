export default function validate(editedtask){
  if(!editedtask.description){
    return { error: true, message: 'Description is required' };
  }

  if(editedtask.subTasks.length){
    const invalidSubTask = editedtask.subTasks.find(subTask => !subTask.description.trim());
    if(invalidSubTask){
      return { error: true, message: 'Sub-task description is required' };
    }
  }
  return { error: false };
}