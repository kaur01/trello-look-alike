export const addlist = (list) => {
  return{
    type: 'ADDLIST',
    listname: list
  }
}
export const removelist = (list) => {
  return{
    type: 'REMOVELIST',
    listname: list
  }
}
export const addtask = (task) => {
  return{
    type: "ADDTASK",
    listname: task.listname,
    task: task.task,
    taskname: task.taskName,
    taskdate: task.taskdate,
    taskdesc: task.taskdesc
  }
}
export const removetask = (list, task) => {
  return{
    type: 'REMOVETASK',
    list: list,
    task: task,
    taskname: task.taskname
  }
}
export const edittask = (list,task,newTask,newTaskDate,newTaskDesc) => {
  return{
    type: 'EDITTASK',
    list: list,
    task: task,
    newTask: newTask,
    newTaskDate: newTaskDate,
    newTaskDesc: newTaskDesc
  }
}

export const moveTask = (task, droppedList) => {
  return{
    type: 'MOVETASK',
    task: task,
    droppedList: droppedList
  }
}
