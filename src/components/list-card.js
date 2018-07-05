import React, { Component } from "react";

import TaskCard from "./task-card";

class ListCard extends Component {
	render(){
	 return(<div key={this.props.listIndex} className = "one-list" id={"list@"+{this.props.listIndex}} onDragOver={e => e.preventDefault()} onDrop={(e)=> this.props.onDrop(e)}>
          <div className="list-header">
          <h2>{this.props.listItem.listname}</h2>
          <button onClick = {() => {this.props.removelists(this.props.listItem)}}>Remove</button>
          <button onClick = {() => {this.props.openModal(this.props.listItem)}} > Add Task </button>
          </div>
          {item.tasks.map((task,index2) => {
              return <TaskCard
													listIndex= {this.props.listIndex}
													taskIndex={index2}
													task={task} listItem={this.props.listItem}
													setDraggedTask={(e) => this.setDraggedTask(e)}
													removetasks={(this.props.listItem,task) => this.removetask(this.props.listItem,task)}
													openTaskModal={(this.props.listItem,task) => this.openTaskModal(this.props.listItem,task)}
											/>;
                 })}
          </div>);
}
}

export default ListCard;
