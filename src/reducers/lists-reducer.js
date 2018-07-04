export default function(state = [], action ){
  switch (action.type) {
    case "ADDLIST":
      let list = {
        listname: action.listname,
        tasks: []
      };
      return [...state, list];

    case "REMOVELIST":
      const firstMatchIndex = state.indexOf(action.listname);
      return state.filter((item,index) => index !== firstMatchIndex);


    case "ADDTASK":
    const listIndex = state.indexOf(action.listname);
     let task = {
       taskname: action.taskname,
       taskdate: action.taskdate,
      taskdesc:  action.taskdesc
     }
     state[listIndex].tasks.push(task);
     return [...state];

     case "REMOVETASK":
     const liIndex = state.indexOf(action.list);
     const taskIndex = state[liIndex].tasks.indexOf(action.task);
     console.log(taskIndex, liIndex, state[liIndex]);
     state[liIndex].tasks.splice(taskIndex,1);
     return [...state];

     case "EDITTASK":
     console.log(action.list,action.task,action.newTask)
     const lIndex = state.indexOf(action.list);
     const tIndex =  state[lIndex].tasks.indexOf(action.task);
     state[lIndex].tasks[tIndex].taskname = action.newTask;
     state[lIndex].tasks[tIndex].taskdate = action.newTaskDate;
     state[lIndex].tasks[tIndex].taskdesc = action.newTaskDesc;
     console.log(state[lIndex].tasks[tIndex].taskname);
     return [...state];

     case "MOVETASK":
     console.log(action, "REDUCER");
     // Remove from existing list
     let temp = state[action.task.listIndex].tasks[action.task.taskIndex];
     state[action.task.listIndex].tasks.splice(action.task.taskIndex,1);
     // Move to new List
     state[action.droppedList].tasks.push(temp);
     return [...state];


    default:
      return state
  }
}
