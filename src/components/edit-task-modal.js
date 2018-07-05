import React, { Component } from "react";
import Modal from 'react-modal';

class EditTaskModal extends Component{
  <Modal
  isOpen={this.props.isOpen}
  onRequestClose={this.closeModal}
  style={this.props.customStyles}>
  <p>Please Enter Task Details Here</p>
  <input placeholder = "Enter Task Name Here"
  onChange = { (e) =>   this.props.edittaskname(e)}
  value = {this.state.edittaskname}/>
  <input placeholder = "Enter Task Start Date Here"
  onChange = { (e) =>   this.props.edittaskdate(e)}
  value = {this.state.edittaskdate}/>
  <input placeholder = "Enter Task Description Here"
  onChange = { (e) =>   this.props.edittaskdesc(e)}
  value = {this.state.edittaskdesc}/>
  <button onClick = {(e) => {this.props.editTasks(e)}}> Submit </button>
  </Modal>
}


export default EditTaskModal;
