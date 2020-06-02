import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Todos from "./components/Todos";
import Header from "./components/Layout/Header";
import AddTodo from "./components/AddTodo";
import About from "./components/Pages/About";
import { v4 as uuid } from "uuid";
import "./App.css";

class App extends Component {
  state = {
    todos: [
      {
        id: uuid(),
        title: "take out the trash",
        completed: false,
      },
      {
        id: uuid(),
        title: "study React",
        completed: false,
      },
      {
        id: uuid(),
        title: "have meal",
        completed: false,
      },
    ],
  };

  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((e) => {
        if (e.id === id) {
          e.completed = !e.completed;
        }
        return e;
      }),
    });
  };

  delTodo = (id) => {
    this.setState({
      todos: [...this.state.todos.filter((e) => e.id !== id)],
    });
  };

  addTodo = (title) => {
    const newTodo = {
      id: uuid(),
      title: title,
      completed: false,
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
