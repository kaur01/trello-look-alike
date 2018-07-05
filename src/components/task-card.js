import React, { Component } from "react";

class TaskCard extends Component {
	render(){
  return(<div key={this.props.taskIndex} className="list-body" id={this.props.listIndex+"@"+this.props.taskIndex} draggable={true} onDragStart= {e => this.props.setDraggedTask(e)} onDragOver={e => e.preventDefault()}>
                     <p>Name - {this.props.task.taskname}</p>
                      <p>Date - {this.props.task.taskdate}</p>
                      	<p>Description - {this.props.task.taskdesc}</p>
                     <button onClick = {() => {this.props.removetasks(this.props.listItem,this.props.task)}}>Remove</button>
                     <button onClick = {() => {this.props.openTaskModal(this.props.listItem,this.props.task)}}>Edit Task</button>
                      </div>)
  }
}

export default TaskCard;
