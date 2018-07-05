import React, { Component } from "react";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Modal from 'react-modal';

import { addlist,removelist,addtask,removetask,edittask,moveTask } from '../actions/index';
import ListCard from './list-card';
import TaskModal from './task-modal';
import ListModal from './list-modal';
import EditTaskModal from './edit-task-modal';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

class Trello extends Component{
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      editmodalIsOpen: false,
      taskname: "",
      taskdate: "",
      taskdesc: "",
      edittaskname: "",
      edittaskdate: "",
      edittaskdesc: "",
      listname: "",
      listSelected: [],
      taskSelected: []
    };
    this.openTaskModal = this.openTaskModal.bind(this);
    this.closeTaskModal = this.openTaskModal.bind(this);
    this.openListModal = this.openListModal.bind(this);
    this.closeListModal = this.openListModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  openModal(item){
      this.setState({modalIsOpen: true, listSelected: item});

  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  openListModal(){
      this.setState({listmodalIsOpen: true});

  }

  closeListModal() {
    this.setState({listmodalIsOpen: false});
  }


  openTaskModal(item,task){
      this.setState({editmodalIsOpen: true, listSelected: item, taskSelected: task});
  }

  closeTaskModal() {
    this.setState({editmodalIsOpen: false});
  }



  addlists(e){
    var listname = this.state.listname;
    if (listname !== null && listname !== '' )
    this.props.addlist(listname);
    this.setState({listname:"",listmodalIsOpen:false});
  }

  removelists(item){
    this.props.removelist(item);
  }

addtasks(){
  if (this.state.taskname !== "" && this.state.taskdate !== "" && this.state.taskdesc !== "")
  {
    this.props.addtask({
      listname: this.state.listSelected,
      task: this.state.taskSelected,
      taskName: this.state.taskname,
      taskdate: this.state.taskdate,
      taskdesc: this.state.taskdesc
    });
    this.setState({taskname: "",taskdate: "",taskdesc: ""});
    this.closeModal();
  }
}

removetasks(list, task){
  this.props.removetask(list, task);
}
setDraggedTask(e){
  let id = e.target.id;
  let listIndex = id.substring(0,id.indexOf('@'));
  let taskIndex = id.substring(id.indexOf('@')+1, id.length);
  this.setState({
    draggedTask: {
      listIndex: listIndex,
      taskIndex: taskIndex
    }
  });
}

editTasks(){
  var list = this.state.listSelected
  var task = this.state.taskSelected
  var newTask =  this.state.edittaskname
  var newTaskDate = this.state.edittaskdate
  var newTaskDesc = this.state.edittaskdesc
  this.props.edittask(list,task,newTask,newTaskDate,newTaskDesc);
  this.setState({edittaskname: "",edittaskdate: "",edittaskdesc: "",editmodalIsOpen: false});
}
onDrop(e){
  let droppedListIndex = e.target.id.substring(e.target.id.indexOf('@')+ 1, e.target.id.length);
  droppedListIndex !== "" ? this.props.moveTask(this.state.draggedTask, droppedListIndex): undefined;
}
  render(){
  return (<div className="page-container">
            <div className="page-header">
            <h1>Welcome To The Trello App</h1>
            <button onClick = {(e) => {this.openListModal()}}> Add List </button>
            </div>
            <div className = "all-lists">
            {this.props.lists.map((item,index1) => {
              return(
                <ListCard key = {index1}
                listIndex = {index1} listItem={item}
                onDropped = {(e) => this.onDropped(e)}  removelists = {(item) => this.removelists(item)}
                openModal = {(item) => this.openModal(item)}
                setDraggedTask={(e) => this.setDraggedTask(e)}
                removetasks={(listItem,task) => this.removetasks(listItem,task)}
                openTaskModal={(listItem,task) => this.openTaskModal(listItem,task)}
                onDrop = {(e) => this.onDrop(e)}/>
              )
            })}
            </div>
            <TaskModal isOpen = {this.state.modalIsOpen} closeModal={()=> this.closeModal}
            customStyles={customStyles} setTaskName = {(e) => this.setState({taskname: e.target.value})}
            setTaskDate = {(e) => this.setState({taskdate: e.target.value})}
            setTaskDesc = {(e) => this.setState({taskdesc: e.target.value})}
            close = {(e) => this.setState({modalIsOpen:false})} addtasks = {(e) =>this.addtasks(e)} />

            <ListModal isOpen = {this.state.listmodalIsOpen} closeModal={()=> this.closeListModal}
            customStyles={customStyles} listname = {(e) => this.setState({listname: e.target.value})}
            close = {(e) => this.setState({listmodalIsOpen:false})}
            addlists = {(e) =>this.addlists(e)} />

            <EditTaskModal isOpen={this.state.editmodalIsOpen} closeModal={()=> this.closeTaskModal}
            customStyles={customStyles} edittaskname = {(e) =>   this.setState({edittaskname: e.target.value})}
            edittaskdate = {(e) => this.setState({edittaskdate: e.target.value})}
            edittaskdesc = {(e) => this.setState({edittaskdesc: e.target.value})} editTasks = {(e) => {this.editTasks(e)}}
            close = {(e) => this.setState({editmodalIsOpen:false})}/>
        </div>);
      }
}


function mapStateToProps(state){
  return{
    lists: state.lists
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addlist:addlist , removelist:removelist, addtask:addtask, removetask:removetask, edittask:edittask, moveTask:moveTask },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Trello);
