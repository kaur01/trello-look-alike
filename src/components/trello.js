import React, { Component } from "react";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Modal from 'react-modal';

import { addlist,removelist,addtask,removetask,edittask,moveTask } from '../actions/index';

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
                <div key={index1} className = "one-list" id={"list@"+index1} onDragOver={e => e.preventDefault()} onDrop={e=> this.onDrop(e)}>
                <div className="list-header">
                <h2>{item.listname}</h2>
                <button onClick = {() => {this.removelists(item)}}>Remove</button>
                <button onClick = {() => {this.openModal(item)}} > Add Task </button>
                </div>
                 {item.tasks.map((task,index2) => {
                   return(
                     <div key={index2} className="list-body" id={index1+"@"+index2} draggable={true} onDragStart= {e => this.setDraggedTask(e)} onDragOver={e => e.preventDefault()}>
                     <p>Name - {task.taskname}</p>
                      <p>Date - {task.taskdate}</p>
                        <p>Description - {task.taskdesc}</p>

                     <button onClick = {() => {this.removetasks(item,task)}}>Remove</button>
                     <button onClick = {() => {this.openTaskModal(item,task)}}>Edit Task</button>
                      </div>);
                 })}
                </div>
              )
            })}
            </div>
            <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}>
            <p>Please Enter Task Details Here</p>
            <input placeholder = "Enter Task Name Here"
            onChange = { (e) =>   this.setState({taskname: e.target.value})}/>
            <input placeholder = "Enter Task Start Date Here"
            onChange = { (e) =>   this.setState({taskdate: e.target.value})}/>
            <input placeholder = "Enter Task Description Here"
            onChange = { (e) =>   this.setState({taskdesc: e.target.value})}/>
            <button onClick = {(e) => {this.addtasks()}}> Submit </button>
            </Modal>



            <Modal
            isOpen={this.state.listmodalIsOpen}
            onRequestClose={this.closeListModal}
            style={customStyles}>
            <p>Please Enter List Name Here</p>
            <input placeholder = "Enter List Name Here"
            onChange = { (e) =>   this.setState({listname: e.target.value})}/>
            <button onClick = {(e) => {this.addlists()}}> Submit </button>
            </Modal>




            <Modal
            isOpen={this.state.editmodalIsOpen}
            onRequestClose={this.closeTaskModal}
            style={customStyles}>
            <p>Please Enter Task Details Here</p>
            <input placeholder = "Enter Task Name Here"
            onChange = { (e) =>   this.setState({edittaskname: e.target.value})}
            value = {this.state.edittaskname}/>
            <input placeholder = "Enter Task Start Date Here"
            onChange = { (e) =>   this.setState({edittaskdate: e.target.value})}
            value = {this.state.edittaskdate}/>
            <input placeholder = "Enter Task Description Here"
            onChange = { (e) =>   this.setState({edittaskdesc: e.target.value})}
            value = {this.state.edittaskdesc}/>
            <button onClick = {(e) => {this.editTasks()}}> Submit </button>
            </Modal>

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
