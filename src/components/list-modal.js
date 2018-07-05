import React, { Component } from "react";
import Modal from 'react-modal';

class ListModal extends Component{
  render(){
    return(
          <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.props.closeModal}
          style={this.props.customStyles}>
          <p>Please Enter List Name Here</p>
          <input placeholder = "Enter List Name Here"
          onChange = { (e) =>   this.props.listname(e) }/>
          <button onClick = {(e) => {this.props.addlists(e)}}> Submit </button>
          </Modal>
    );
  }
}





export default ListModal;
