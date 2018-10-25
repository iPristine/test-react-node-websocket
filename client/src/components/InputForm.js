import React, { Component } from "react";

class InputForm extends Component {
  handleSubmit = event => {
    this.props.addMessage(event.target.elements.input.value);
    console.log(event.target.elements.input.value);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" id="input" />
      </form>
    );
  }
}

export default InputForm;
