import React, { Component } from "react";

import TaskCard from "./task-card";

class ListCard extends Component {
	render(){
  let listItem = this.props.listItem;
	 return(<div className = "one-list" id={"list@"+this.props.listIndex} onDragOver={e => e.preventDefault()} onDrop={(e)=> this.props.onDrop(e)}>
          <div className="list-header">
          <h2>{this.props.listItem.listname}</h2>
          <button onClick = {() => {this.props.removelists(this.props.listItem)}}>Remove</button>
          <button onClick = {() => {this.props.openModal(this.props.listItem)}} > Add Task </button>
          </div>
          {listItem.tasks.map((task,index2) => {
              return <TaskCard key={index2}
													listIndex= {this.props.listIndex}
													taskIndex={index2}
													task={task} listItem={this.props.listItem}
													setDraggedTask={(e) => this.props.setDraggedTask(e)}
													removetasks={(listItem,task) => this.props.removetasks(listItem,task)}
													openTaskModal={(listItem,task) => this.props.openTaskModal(listItem,task)}
											/>;
                 })}
          </div>)
}
}

export default ListCard;
