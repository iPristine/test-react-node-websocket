import React, { Component } from "react";
import "./App.css";

import InputForm from "./components/InputForm";
import MessagesList from "./components/MessagesList";

class App extends Component {
  state = { posts: [], myName: "Denis M" };

  addMessage = message => {
    this.state.posts.push({
      key: message.id,
      authorName: message.authorName,
      content: message.content
    });
    this.setstate({
      posts: this.state.posts
    });
  };

  handleSubmit = message => {
    this.props.socket.send(
      JSON.stringify({
        authorName: this.state.myName,
        content: message
      })
    );
  };

  componentDidMount() {
    this.props.socket.onmessage = event => {
      //console.log(event.data);
      const message = JSON.parse(event.data);
      if (message.type === "message") {
        this.addMessage(message.message);
      } else if (message.type === "messages") {
        this.setState({
          posts: message.messages
        });
      }
    };
  }

  render() {
    return (
      <div className="App">
        <InputForm addMessage={this.handleSubmit} />
        <MessagesList posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
