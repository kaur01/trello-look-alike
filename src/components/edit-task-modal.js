import React, { Component } from "react";
import Modal from 'react-modal';

class EditTaskModal extends Component{
render(){
  return(<Modal
    isOpen={this.props.isOpen}
    onRequestClose={this.props.closeModal}
    style={this.props.customStyles}>
    <p>Please Enter Task Details Here</p>
    <input placeholder = "Enter Task Name Here"
    onChange = { (e) =>   this.props.edittaskname(e)}
    value = {this.props.taskname}/>
    <input placeholder = "Enter Task Start Date Here"
    onChange = { (e) =>   this.props.edittaskdate(e)}/>
    <input placeholder = "Enter Task Description Here"
    onChange = { (e) =>   this.props.edittaskdesc(e)}/>
    <button onClick = {(e) => {this.props.editTasks(e)}}> Submit </button>
    <button onClick = {(e) => {this.props.close(e)}}> Cancel </button>
    </Modal>);
}
}


export default EditTaskModal;
