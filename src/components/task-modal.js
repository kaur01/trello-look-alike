import React, { Component } from "react";
import Modal from 'react-modal';


class TaskModal extends Component{
render(){
  return(<Modal
  isOpen={this.props.isOpen}
  onRequestClose={this.props.closeModal}
  style={this.props.customStyles}>
  <p>Please Enter Task Details Here</p>
  <input placeholder = "Enter Task Name Here"
  onChange = { (e) =>   this.props.setTaskName(e)}/>
  <input placeholder = "Enter Task Start Date Here"
  onChange = { (e) =>   this.props.setTaskDate(e)}/>
  <input placeholder = "Enter Task Description Here"
  onChange = { (e) =>   this.props.setTaskDesc(e)}/>
  <button onClick = {(e) => {this.props.addtasks(e)}}> Submit </button>
  <button onClick = {(e) => {this.props.close(e)}}> Cancel </button>
  </Modal>);
}
}

export default TaskModal;
